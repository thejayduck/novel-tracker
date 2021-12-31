import { withInfoHelperPost } from "lib/apiHelpers";
import {denyBook, listUsers} from "lib/db";
import { parseID } from "lib/types";

export default withInfoHelperPost([], async (_, params, user_info) => {
  if (user_info.moderation_level < 3) {
    throw {
      message: "No authorized to accept book submissions"
    };
  }

  return await listUsers();
}, true);
