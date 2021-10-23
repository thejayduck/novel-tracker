import { withInfoHelperGet } from "lib/apiHelpers";
import { getUserBookProgress } from "lib/db";
import { parseID } from "lib/types";

export default withInfoHelperGet(["book_id"], async (_token, params, user_info) => {
  const book_id = parseID(params.book_id);
  const progress = await getUserBookProgress(user_info._id, book_id);
  return progress;
}, true);