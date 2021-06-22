import { getUserBookInfos, getVolumeForChapters, withUserId } from "../../../lib/db";
import { createSerializableBookInfo, ID } from "../../../lib/types";

export default async function handler({ cookies }, res) {
    const token = cookies.token;
    try {
        const info = await withUserId(token, async (user_id) => await getUserBookInfos(user_id).then(info => Promise.all(info.map(async (v) => ({
            ...createSerializableBookInfo(v),
            volumes_read: await getVolumeForChapters(v.book_id, v.chapters_read),
        })))));
        res.status(200).json({ status: "OK", info });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}