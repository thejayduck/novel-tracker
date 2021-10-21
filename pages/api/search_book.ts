import { withHelperBareGet } from "lib/apiHelpers";
import { getUserId, searchBook } from "lib/db";

export default withHelperBareGet([], async (token, params) => {
  const user_id = await getUserId(token);
  return await searchBook(user_id, params.query, params.releaseStatus, params.genre, params.year && Number.parseInt(params.year), params.mine == "true", params.tracking_status);
});