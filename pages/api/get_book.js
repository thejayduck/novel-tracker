import { getBook } from '../../lib/db';

export default async function handler({ query }, res) {
    const book = await getBook(query.id);
    res.status(200).json(book);
}