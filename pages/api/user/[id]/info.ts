import { withHelperBareGet } from "lib/apiHelpers";
import { getUserInfo } from "lib/db";
import { getExtendedUserInfo } from "lib/serverHelpers";
import { parseID } from "lib/types";

export default withHelperBareGet([], async (_, params) => {
  const id = parseID(params.id);
  const user_info = await getUserInfo(id);
  return await getExtendedUserInfo(user_info);
});