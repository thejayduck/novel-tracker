import { withHelperBareGet } from 'lib/apiHelpers';
import { getBook } from 'lib/db';
import { parseID } from 'lib/types';

export default withHelperBareGet(["id"], async (_, params) => {
    const id = parseID(params.id);
    return await getBook(id)
});