import { serialize } from "cookie";

import { connectDb, createSession, createUserFromGoogle, findUserIdFromGoogle } from "lib/db";

function toUrlEncoded(obj: any) {
  let formBody: any = [];
  for (const property in obj) {
    const encodedKey = property;
    const encodedValue = encodeURIComponent(obj[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join("&");

  return formBody;
}

async function acessTokenRequest(code, redirect_uri) {
  const body = toUrlEncoded({
    code,
    client_id: "524679525288-o6gbij04v72f2i5ub4f83974mfocrc05.apps.googleusercontent.com",
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri,
    grant_type: "authorization_code",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body,
  });

  if (response.status != 200) {
    const err_obj = await response.json();
    throw {
      message: "Google OAuth2 Token request returned an error!",
      details: err_obj
    };
  }

  const json = await response.json();

  return json.access_token;
}

async function getUserInfo(access_token) {
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    method: "GET",
    cache: "no-cache",
    headers: new Headers({
      "Authorization": `Bearer ${access_token}`,
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

async function findOrCreateUserFromGoogleUserId(gui) {
  let new_account = false;

  let user_id = await findUserIdFromGoogle(gui);
  if (user_id == null) {
    new_account = true;
    user_id = await createUserFromGoogle(gui);
  }

  return { user_id, new_account };
}

export default async function Auth(req, res) {
  const { code } = req.query;

  const proto = req.headers["x-forwarded-proto"] == "https" || req.connection.encrypted
    ? "https:"
    : "http:";

  await connectDb();

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
      res.setHeader("Set-Cookie", serialize("token", result.session_token, { path: "/", httpOnly: false, sameSite: "lax", expires: new Date(new Date(Date.now()).getUTCFullYear() + 1, 7, 2, 15, 11) }));

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
      console.error(err);
      res.status(500).json({ status: "Error", error: err });
    });
}