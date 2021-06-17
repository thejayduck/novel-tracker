import { randomBytes } from 'crypto';
import { serialize } from 'cookie';
const { Pool } = require('pg');
const pool = new Pool();

function toUrlEncoded(obj) {
    let formBody = [];
    for (const property in obj) {
        const encodedKey = property;
        const encodedValue = encodeURIComponent(obj[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody;
}

async function acessTokenRequest(code, redirect_uri) {
    const body = toUrlEncoded({
        code: code,
        client_id: "524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com",
        client_secret: process.env.LNLDB_GOOGLE_CLIENT_SECRET,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
    });

    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body,
    });

    if (response.status != 200) {
        const err_obj = await response.json();
        throw {
            message: "Google OAuth2 Token request returned an error!",
            details: err_obj
        }
    }

    const json = await response.json();

    return json.access_token;
}

async function getUserInfo(access_token) {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        method: 'GET',
        cache: 'no-cache',
        headers: new Headers({
            'Authorization': `Bearer ${access_token}`,
        })
    });

    if (response.status != 200) {
        const err_obj = await response.json();
        throw {
            message: "Google Userinfo request returned an error!",
            details: err_obj
        };
    }

    const json = await response.json();

    return json;
}

async function findUserIdFromGoogle(gui) {
    const result = await pool.query("SELECT user_id FROM users WHERE google_user_id = $1", [gui]);

    if (result.rowCount > 1) {
        throw {
            message: "More than one account associated with this google user id??",
        };
    }
    if (result.rowCount == 0) {
        return null;
    }

    return result.rows[0].user_id;
}

async function createUserFromGoogleUserId(gui) {
    const create_result = await pool.query("INSERT INTO users (google_user_id) VALUES ($1)", [gui]);
    if (create_result.rowCount == 0) {
        throw {
            message: "Unable to create user",
        };
    };
}

async function findOrCreateUserFromGoogleUserId(gui) {
    let new_account = false;

    let user_id = await findUserIdFromGoogle(gui);
    if (user_id == null) {
        new_account = true;
        await createUserFromGoogleUserId(gui);
        user_id = await findUserIdFromGoogle(gui); // Find it again
    }

    return { user_id, new_account };
}

async function createSession(user_id) {
    const session_token = randomBytes(32).toString('hex');

    await pool.query("INSERT INTO sessions (user_id, session_token) VALUES ($1, $2)", [user_id, session_token]);

    return session_token;
}

export default async function Auth(req, res) {
    const { code } = req.query;

    const proto = req.headers["x-forwarded-proto"] == "https" || req.connection.encrypted
        ? "https:"
        : "http:";

    return acessTokenRequest(code, `${proto}//${req.headers.host}/api/auth`) // TODO check http vs https
        .then(access_token => getUserInfo(access_token))
        .then(userinfo => userinfo.id)
        .then(async (google_user_id) => {
            const { user_id, new_account } = await findOrCreateUserFromGoogleUserId(google_user_id);

            const session_token = await createSession(user_id);

            return {
                action: new_account ? "setup_account" : "logged_in",
                session_token
            };
        })
        .then(result => {
            res.setHeader('Set-Cookie', serialize('token', result.session_token, { path: "/", httpOnly: false, sameSite: "lax" }));

            if (result.action == "setup_account") {
                res.status(200).redirect("/setupAccount");
            } else if (result.action == "logged_in") {
                res.status(200).redirect("/");
            } else {
                throw {
                    message: "Unknown action",
                };
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ status: "Error", error: err });
        });
}