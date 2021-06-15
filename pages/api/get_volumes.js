const { Pool } = require('pg');
const pool = new Pool();

export default async function searchBook({ query }, res) {
    const volumes = await pool.query('SELECT volume_number, chapter_count FROM volumes WHERE book_id = $1::integer', [query.id]);
    const volume_arr = volumes.rows
        .sort((e, o) => e.volume_number > o.volume_number)
        .reduce((arr, e) => {
            arr.push({ chapter_count: e.chapter_count });
            return arr;
        }, []);

    res.status(200).json(volume_arr);
}