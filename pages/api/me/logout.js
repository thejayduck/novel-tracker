import { serialize } from "cookie";
import { deleteSession } from "../../../lib/db";

export default async function Auth({ cookies }, res) {
    const token = cookies.token;
    await deleteSession(token);
    res.setHeader('Set-Cookie', serialize('token', null, { path: "/", httpOnly: false, sameSite: "strict" })); // Expires in 1999 aka always
    res.status(200).redirect("/");
}