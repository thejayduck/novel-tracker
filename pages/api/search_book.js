const { Pool } = require('pg');
const pool = new Pool();

export default async function searchBook({ query }, res) {
    const result = await pool.query("SELECT * FROM books WHERE title ILIKE upper('%' || $1 || '%') LIMIT 50", [query.title]);
    res.status(200).json(result.rows);
}