import { withHelperBareGet } from "lib/apiHelpers";
import { searchBook } from "lib/db";
import { parseID } from "lib/types";

export default withHelperBareGet([], async (_token, params) => {
  return await searchBook(params.query, params.releaseStatus, params.genre, params.year && Number.parseInt(params.year), params.user_id && parseID(params.user_id), params.tracking_status);
});