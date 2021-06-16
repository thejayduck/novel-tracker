const { Pool } = require('pg');
const pool = new Pool();

export async function getUserIdFromToken(token) {
    const result = await pool.query("SELECT user_id FROM sessions WHERE session_token = $1", [token]);

    if (result.rowCount > 1) {
        throw new {
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
        throw new {
            message: "More than one account associated with this token??",
        };
    }
}