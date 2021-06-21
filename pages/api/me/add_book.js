import { addUserBooks, getUserBooks, withUserId } from "../../../lib/db";

export default async function setUsername({ cookies, body }, res) {
    const token = cookies.token;
    try {
        if (!body) {
            throw {
                message: "No POST body"
            }
        };
        const book_id = body.book_id;
        if (!book_id) {
            throw {
                message: "Invalid book id.",
                book_id,
            }
        }
        await withUserId(token, async (user_id) => {
            const userBooks = await getUserBooks(user_id);
            if (userBooks.map(v => v.book_id).includes(book_id)) {
                throw {
                    message: "Books already exists in library"
                }
            }
            await addUserBooks(user_id, book_id);
        });
        res.status(200).json({ status: "OK" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}