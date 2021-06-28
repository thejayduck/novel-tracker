import { withInfoHelperPost } from "../../../lib/apiHelpers";
import { deleteUserBooks } from "../../../lib/db";
import { parseID } from "../../../lib/types";

export default withInfoHelperPost(["book_id"], async (_token, params, user_info) => {
    const book_id = parseID(params.book_id);
    await deleteUserBooks(user_info.user_id, book_id);
}, true);