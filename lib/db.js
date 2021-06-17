const { Pool } = require('pg');
const pool = new Pool();

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

export async function deleteSession(token) {
    const result = await pool.query("DELETE FROM sessions WHERE session_token = $1", [token]);

    if (result.rowCount > 1) {
        throw {
            message: "More than one account associated with this token??",
        };
    }
}

export async function getUserInfoFromId(user_id) {
    const result = await pool.query("SELECT user_id, moderation_level FROM users WHERE user_id = $1", [user_id]);

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

export async function getUserInfoFromToken(token) {
    const user_id = await getUserIdFromToken(token);
    if (user_id == null) {
        return null
    }

    const info = await getUserInfoFromId(user_id);
    return info;
}