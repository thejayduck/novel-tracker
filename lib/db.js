import { randomBytes } from 'crypto';
const { Pool } = require('pg');
const pool = new Pool();

export async function createUserFromGoogleUserId(gui) {
    const create_result = await pool.query("INSERT INTO users (google_user_id) VALUES ($1)", [gui]);
    if (create_result.rowCount == 0) {
        throw {
            message: "Unable to create user",
        };
    };
}

export async function findUserIdFromGoogle(gui) {
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

export async function createSession(user_id) {
    const session_token = randomBytes(32).toString('hex');

    await pool.query("INSERT INTO sessions (user_id, session_token) VALUES ($1, $2)", [user_id, session_token]);

    return session_token;
}

export async function deleteSession(token) {
    const result = await pool.query("DELETE FROM sessions WHERE session_token = $1", [token]);

    if (result.rowCount > 1) {
        throw {
            message: "More than one account associated with this token??",
        };
    }
}

export async function getUserIdFromToken(token) {
    const result = await pool.query("SELECT user_id FROM sessions WHERE session_token = $1", [token]);

    if (result.rowCount > 1) {
        throw {
            message: "More than one account associated with this token??",
        };
    }
    if (result.rowCount == 0) {
        return null;
    }

    return result.rows[0].user_id;
}


export async function getUserInfoFromId(user_id) {
    const result = await pool.query("SELECT user_id, moderation_level, username FROM users WHERE user_id = $1", [user_id]);

    if (result.rowCount > 1) {
        throw {
            message: "More than one account associated with this user id??",
            user_id,
        };
    }
    if (result.rowCount == 0) {
        throw {
            message: "Unable to find a user with that user id",
            user_id,
        };
    }

    return result.rows[0];
}

export async function setUsernameForId(user_id, username) {
    const result = await pool.query("UPDATE users SET username = $2 WHERE user_id = $1", [user_id, username]);

    if (result.rowCount > 1) {
        throw {
            message: "More than one account associated with this user id??",
            user_id,
        };
    }
    if (result.rowCount == 0) {
        throw {
            message: "Unable to find a user with that user id",
            user_id,
        };
    }
}

export async function withUserId(token, callback) {
    const user_id = await getUserIdFromToken(token);
    if (user_id == null) {
        return null
    }

    return callback(user_id);
}