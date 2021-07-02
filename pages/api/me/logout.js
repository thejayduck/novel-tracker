import { serialize } from "cookie";
import { deleteSession } from "../../../lib/db";

export default async function Logout({ cookies, headers }, res) {
    const token = cookies.token;
    try {
        await deleteSession(token);
        res.setHeader('Set-Cookie', serialize('token', null, { path: "/", httpOnly: false, sameSite: "lax", expires: new Date(new Date(Date.now()).getUTCFullYear() + 1, 7, 2, 15, 11), maxAge: -1 }));
        res.status(200).redirect(headers.referer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", error })
    }
}