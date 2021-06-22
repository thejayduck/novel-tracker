import { withInfoHelperGet } from "../../../lib/apiHelpers";

export default withInfoHelperGet([], async (_token, _params, user_info) => user_info.user_id);