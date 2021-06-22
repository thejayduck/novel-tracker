import { createBook, getUserInfo, withUserId } from "../../lib/db";

export default async function handler({ cookies, body }, res) {
    const token = cookies.token;
    try {
        const info = await withUserId(token, async (user_id) => await getUserInfo(user_id));
        if (info.moderation_level < 3) {
            throw {
                message: "Unauthorized",
            }
        }

        if (!body) {
            throw {
                message: "No POST body"
            }
        };
        if (!body.book_details) {
            throw {
                message: "No Book Details"
            }
        };

        const badField = [
            "title", "author", "release_status",
        ].filter(v => body.book_details[v] == null);
        if (badField.length > 0) {
            throw {
                message: "One or more of the fields were null",
                fields: badField,
            }
        }

        Object.keys(body.book_details).forEach(key => {
            if (body.book_details[key] === "") {
                body.book_details[key] = null;
            }
        })

        const id = await createBook(body.book_details);
        res.status(200).json({ status: "OK", id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}