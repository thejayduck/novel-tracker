import { withHelperBareGet } from "@lib/apiHelpers";
import { searchBook } from "@lib/db";

export default withHelperBareGet([], async (_, params) => await searchBook(params.query || ""));