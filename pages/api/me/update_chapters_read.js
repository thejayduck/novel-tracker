import { getVolumeForChapters, updateUserBookChaptersRead, withUserId } from "../../../lib/db";

export default async function handler({ cookies, body }, res) {
    const token = cookies.token;
    try {
        if (!body) {
            throw {
                message: "No POST body"
            }
        };
        const new_chapters_read = body.new_chapters_read;
        if (isNaN(new_chapters_read)) {
            throw {
                message: "Invalid value for chapters read."
            }
        }
        const book_id = body.book_id;
        if (!book_id) {
            throw {
                message: "Invalid book id."
            }
        }
        const new_volumes_read = await withUserId(token, async (user_id) => {
            await updateUserBookChaptersRead(user_id, book_id, new_chapters_read);
            return await getVolumeForChapters(book_id, new_chapters_read);
        });
        res.status(200).json({ status: "OK", info: { chapters_read: new_chapters_read, volumes_read: new_volumes_read } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}