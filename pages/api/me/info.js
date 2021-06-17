import { getUserInfoFromId, withUserId } from "../../../lib/db";

export default async function Info({ cookies }, res) {
    const token = cookies.token;
    try {
        const info = await withUserId(token, async (user_id) => await getUserInfoFromId(user_id));
        res.status(200).json({ status: "OK", info });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}