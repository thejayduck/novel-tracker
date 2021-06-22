import { withInfoHelperPost } from "../../../lib/apiHelpers";
import { addUserBooks, getUserBooks } from "../../../lib/db";
import { parseID } from "../../../lib/types";

export default withInfoHelperPost(["book_id"], async (_, params, user_info) => {
    const book_id = parseID(params.book_id);
    // TODO DB Method to check if it already exists
    const userBooks = await getUserBooks(user_info.user_id);
    if (userBooks.map(v => v.book_id).includes(book_id)) {
        throw {
            message: "Books already exists in library"
        }
    }
    await addUserBooks(user_info.user_id, book_id);
});
