import { withInfoHelperPost } from "../../../lib/apiHelpers";
import { setBookAcceptStatus } from "../../../lib/db";
import { parseID } from "../../../lib/types";

export default withInfoHelperPost(["book_id"], async (_, params, user_info) => {
    const book_id = parseID(params.book_id);
    if (user_info.moderation_level < 2) {
        throw {
            message: "No authorized to accept book submissions"
        };
    }
    await setBookAcceptStatus(book_id, true);
});
