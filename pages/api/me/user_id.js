import { getUserIdFromToken } from "../../../lib/db";

export default async function test({ query, cookies }, res) {
    const token = cookies.token;
    const user_id = await getUserIdFromToken(token);
    res.status(200).json({ status: "OK", user_id });
}