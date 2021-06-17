import { getUserIdFromToken, getUserInfoFromId, getUserInfoFromToken } from "../../../lib/db";

export default async function Info({ cookies }, res) {
    try {
        const token = cookies.token;
        const info = getUserInfoFromToken(token);

        res.status(200).json({ status: "OK", info });
    } catch (error) {
        res.status(500).json({ status: "Error", error })
    }
}