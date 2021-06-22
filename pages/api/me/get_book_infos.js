import { withInfoHelperGet } from "../../../lib/apiHelpers";
import { getUserBookInfos, getVolumeForChapters } from "../../../lib/db";

export default withInfoHelperGet([], async (_token, _params, user_info) => {
    const user_books = await getUserBookInfos(user_info.user_id);
    const fixed_user_books = await Promise.all(user_books.map(async (book) => {
        const volumes_read = await getVolumeForChapters(book.book_id, book.chapters_read);
        return {
            ...book,
            volumes_read,
        }
    }));
    return fixed_user_books;
});