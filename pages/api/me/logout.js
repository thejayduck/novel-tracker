import { serialize } from "cookie";
import { deleteSession } from "../../../lib/db";

export default async function Logout({ cookies }, res) {
    try {
        const token = cookies.token;
        await deleteSession(token);
        res.setHeader('Set-Cookie', serialize('token', null, { path: "/", httpOnly: false, sameSite: "lax" })); // Expires in 1999 aka always
        res.status(200).redirect("/");
    } catch (error) {
        res.status(500).json({ status: "Error", error })
    }
}