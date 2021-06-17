import { getUserIdFromToken } from "../../../lib/db";

export default async function UserId({ cookies }, res) {
    const token = cookies.token;
    try {
        const user_id = await getUserIdFromToken(token);
        res.status(200).json({ status: "OK", user_id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}