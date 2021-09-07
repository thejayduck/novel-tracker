import { submitBook, getBook } from "lib/db";
import { withInfoHelperPost } from 'lib/apiHelpers';
import { parseID } from "lib/types";

export default withInfoHelperPost(["book_details"], async (_, params, user_info) => {
    const book_details = params.book_details;
    if (!book_details) {
        throw {
            message: "No Book Details"
        }
    }

    const badField = [
        "title", "author", "release_status",
    ].filter(v => book_details[v] == null);
    if (badField.length > 0) {
        throw {
            message: "One or more of the fields were null",
            fields: badField,
        }
    }

    Object.keys(book_details).forEach(key => {
        if (book_details[key] === "") {
            book_details[key] = null;
        }
    })

    let existing_book = null;
    if (book_details.book_id) {
        const book_id = parseID(book_details.book_id);
        existing_book = getBook(book_id);
    }

    let id: any;
    if (existing_book) {
        throw {
            message: "Unimplemented",
        }
    } else {
        id = await submitBook(book_details, user_info._id);
    }

    return {
        id,
    }
}, true);