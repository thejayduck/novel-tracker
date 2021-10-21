import { withHelperBareGet } from "lib/apiHelpers";
import { getUserInfo } from "lib/db";
import { parseID } from "lib/types";

export default withHelperBareGet([], async (_, params) => {
  const id = parseID(params.id);
  const user_info = (await getUserInfo(id)).toJSON();
  delete user_info._id;
  delete user_info.__v;
  return user_info;
});