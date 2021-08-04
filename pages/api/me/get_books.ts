import { withInfoHelperGet } from "../../../lib/apiHelpers";
import { getUserBooks } from "../../../lib/db";

export default withInfoHelperGet([], async (_token, _params, user_info) => {
    const user_books = await getUserBooks(user_info._id);
    return user_books;
}, true);