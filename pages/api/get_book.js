const { Pool } = require('pg');
const pool = new Pool();

export default async function getBook({ query }, res) {
    const result = await pool.query("SELECT * FROM books WHERE id = $1::integer", [query.id]);
    res.status(200).json(result.rows[0]);
}