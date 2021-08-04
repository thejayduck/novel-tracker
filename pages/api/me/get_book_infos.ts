import { withInfoHelperGet } from "../../../lib/apiHelpers";
import { getUserBookInfos } from "../../../lib/db";

export default withInfoHelperGet([], async (_token, _params, user_info) => {
    const user_books = await getUserBookInfos(user_info._id);
    return user_books;
}, true);