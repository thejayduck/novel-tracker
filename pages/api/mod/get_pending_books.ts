import { withInfoHelperGet } from "lib/apiHelpers";
import { getPendingBooks } from "lib/db";

export default withInfoHelperGet([], async (_token, _params, user_info) => {
  if (user_info.moderation_level < 2) {
    throw {
      message: "Unauthorized"
    };
  }
  const pending_books = await getPendingBooks();
  return pending_books;
}, true);