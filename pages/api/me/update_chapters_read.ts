import { withInfoHelperPost } from "../../../lib/apiHelpers";
import { getVolumeForChapters, updateUserBookChaptersRead } from "../../../lib/db";
import { parseID } from "../../../lib/types";

export default withInfoHelperPost(["new_chapters_read", "book_id"], async (_, params, user_info) => {
    const book_id = parseID(params.book_id);
    const new_chapters_read = Number.parseInt(params.new_chapters_read);
    await updateUserBookChaptersRead(user_info.user_id, book_id, new_chapters_read);
    const new_volumes_read = await getVolumeForChapters(book_id, new_chapters_read);
    return {
        chapters_read: new_chapters_read,
        volumes_read: new_volumes_read
    };
}, true);