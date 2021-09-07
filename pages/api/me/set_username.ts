import { withInfoHelperPost } from "lib/apiHelpers";
import { setUsername } from "lib/db";

export default withInfoHelperPost(["new_name"], async (_, params, user_info) => {
    if (user_info.username) {
        throw {
            message: "We do not support changing your username right now."
        }
    }
    await setUsername(user_info._id, params.new_name);
}, true);
