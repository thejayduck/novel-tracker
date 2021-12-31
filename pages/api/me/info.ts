import { withInfoHelperGet } from "lib/apiHelpers";
import { getExtendedUserInfo } from "lib/serverHelpers";

export default withInfoHelperGet([], async (_token, _params, user_info) => await getExtendedUserInfo(user_info));