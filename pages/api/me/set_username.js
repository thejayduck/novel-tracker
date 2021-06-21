import { getUserInfo, getUserInfoFromId, setUsernameForId, withUserId } from "../../../lib/db";

export default async function setUsername({ cookies, body }, res) {
    const token = cookies.token;
    try {
        if (!body) {
            throw {
                message: "No POST body"
            }
        };
        const new_name = body.new_name;
        if (!new_name) {
            throw {
                message: "Invalid username."
            }
        }
        await withUserId(token, async (user_id) => {
            const info = await getUserInfo(user_id);
            if (info.username) {
                throw {
                    message: "We do not support changing your username right now."
                }
            }
            await setUsername(user_id, new_name);
        });
        res.status(200).json({ status: "OK" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}