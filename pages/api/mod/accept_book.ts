import { withInfoHelperPost } from "lib/apiHelpers";
import { acceptBook } from "lib/db";
import { parseID } from "lib/types";

export default withInfoHelperPost(["submission_id"], async (_, params, user_info) => {
  const submission_id = parseID(params.submission_id);
  if (user_info.moderation_level < 2) {
    throw {
      message: "No authorized to accept book submissions"
    };
  }
  await acceptBook(submission_id);
}, true);
