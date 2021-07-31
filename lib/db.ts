import { randomBytes } from 'crypto';
import { BookInfo, BookVolume, createSerializableBookInfo, SerializableBookInfo, UserBookInfo } from './types';
import mongoose, { ObjectId } from 'mongoose';
import User, { IUser } from './models/user';
import Session from './models/session';

console.log("Connecting to MongoDB");
if (mongoose.connection.readyState == 0) {
    const connection_string = `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@192.168.68.115:5829/noveltracker?authSource=admin&w=1`;
    mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
}

export async function createUserFromGoogle(gui: number): Promise<null | ObjectId> {
    return await new User({ google_user_id: gui }).save().then(user => user._id);
}

export async function findUserIdFromGoogle(gui: number): Promise<null | ObjectId> {
    return await User.findOne({ google_user_id: gui }).then(user => user && user._id);
}

export async function createSession(user_id: ObjectId) {
    const session_token = randomBytes(32).toString('hex');
    return await new Session({ user_id, session_token }).save().then(session => session.session_token);
}

export async function deleteSession(session_token: string) {
    await Session.deleteOne({ session_token });
}

export async function getUserId(session_token: string) {
    return await Session.findOne({ session_token }).then(session => session && session.user_id);
}


export async function getUserInfo(user_id: ObjectId) {
    return await User.findById(user_id);
}

export async function setUsername(user_id: ObjectId, username: string) {
    await User.findByIdAndUpdate(user_id, { username }, { runValidators: true });
}

export async function submitBook(bookDetails: SerializableBookInfo, submitted_by: number) {
    const result = await pool.query<{ submission_id: number }>(
        "INSERT INTO book_submissions VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, DEFAULT) RETURNING submission_id",
        [
            bookDetails.cover_url,
            bookDetails.title,
            bookDetails.title_romanized,
            bookDetails.title_native,
            bookDetails.description,
            bookDetails.author,
            bookDetails.start_date,
            bookDetails.end_date,
            bookDetails.banner_url,
            bookDetails.release_status,
            submitted_by
        ]
    );

    if (result.rowCount == 0) {
        throw {
            message: "Unable to create book",
        };
    }

    return result.rows[0].submission_id;
}

export async function getBook(book_id: number) {
    const result = await pool.query<BookInfo>("SELECT * FROM books WHERE book_id = $1::integer", [book_id]);

    if (result.rowCount == 0) {
        throw {
            message: "Unable to find a book with that book id",
            book_id,
        };
    }

    const info = result.rows[0];

    return createSerializableBookInfo(info);
}

export async function getPendingBooks() {
    const result = await pool.query<(BookInfo & { submitted_by: number, submission_id: number })>("SELECT * FROM book_submissions");

    return result.rows;
}

export async function getPendingBook(submission_id: number) {
    const result = await pool.query<(BookInfo & { submitted_by: number, submission_id: number })>("SELECT * FROM book_submissions WHERE submission_id = $1", [submission_id]);

    if (result.rowCount == 0) {
        throw {
            message: "Unable to find a book with that submission id",
            submission_id,
        };
    }

    if (result.rowCount > 1) {
        throw {
            message: "More than one book associated with this submission id??",
            submission_id,
        };
    }

    return result.rows[0];
}

export async function acceptBook(submission_id: number) {
    // Should be possible to do in 1 sql statement but can't be bothered to do that right now
    const pending_book = await getPendingBook(submission_id);

    const result = await pool.query(
        "INSERT INTO books VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
            pending_book.cover_url,
            pending_book.title,
            pending_book.title_romanized,
            pending_book.title_native,
            pending_book.description,
            pending_book.author,
            pending_book.start_date,
            pending_book.end_date,
            pending_book.banner_url,
            pending_book.release_status
        ]
    );

    if (result.rowCount == 0) {
        throw {
            message: "Unable to accept book",
        };
    }

    const deleteResult = await pool.query("DELETE FROM book_submissions WHERE submission_id = $1", [submission_id]);

    if (deleteResult.rowCount == 0) {
        throw {
            message: "Unable to delete book submission",
        };
    }

    if (deleteResult.rowCount > 1) {
        throw {
            message: "More than one submission associated with this id??",
        };
    }
}

export async function denyBook(submission_id: number) {
    const result = await pool.query("DELETE FROM book_submissions WHERE submission_id = $1", [submission_id]);

    if (result.rowCount == 0) {
        throw {
            message: "Unable to delete book submission",
        };
    }

    if (result.rowCount > 1) {
        throw {
            message: "More than one submission associated with this id??",
        };
    }
}

export async function getBookWithVolumes(book_id: number): Promise<SerializableBookInfo & { volumes: BookVolume[] }> {
    const book_info = await getBook(book_id);
    const result = await pool.query<BookVolume>("SELECT * FROM volumes WHERE book_id = $1::integer ORDER BY volume_number", [book_id]);

    const volumes = result.rows;

    return { ...book_info, volumes };
}

export async function getUserBookInfos(user_id: number) {
    const result = await pool.query<BookInfo & UserBookInfo>("SELECT * FROM user_books INNER JOIN books USING(book_id) WHERE user_id = $1::integer", [user_id]);

    return result.rows;
}

export async function getUserBooks(user_id: number) {
    const result = await pool.query<{ user_id: number, book_id: number, chapters_read: number }>("SELECT * FROM user_books WHERE user_id = $1::integer", [user_id]);

    return result.rows;
}

export async function addUserBooks(user_id: number, book_id: number) {
    const result = await pool.query("INSERT INTO user_books (user_id, book_id) VALUES ($1, $2)", [user_id, book_id]);

    if (result.rowCount == 0) {
        throw {
            message: "Unable to add book",
        };
    }
}

export async function deleteUserBooks(user_id: number, book_id: number) {
    await pool.query("DELETE FROM user_books WHERE user_id = $1 AND book_id = $2", [user_id, book_id]);
}

export async function updateUserBookChaptersRead(user_id: number, book_id: number, new_chapters_read: number) {
    const result = await pool.query("UPDATE user_books SET chapters_read = $3 WHERE user_id = $1 AND book_id = $2", [user_id, book_id, new_chapters_read]);

    if (result.rowCount > 1) {
        throw {
            message: "More than one user book associated with these ids??",
            user_id,
        };
    }
    if (result.rowCount == 0) {
        throw {
            message: "Unable to find a users book",
            user_id,
        };
    }
}

export async function getVolumeForChapters(book_id: number, chapters_read: number) {
    const result = await pool.query<{ volume_number: number, chapter_count: number }>("SELECT volume_number, chapter_count FROM volumes WHERE book_id = $1 ORDER BY volume_number", [book_id]);
    const [volumes] = result.rows
        .reduce<[number, number][]>((acc, current, idx) => {
            const [, prev_total_chapters] = idx > 0 ? acc[idx - 1] : [0, 0];
            acc.push([current.volume_number, prev_total_chapters + current.chapter_count]);
            return acc;
        }, [])
        .filter(([, total_chapters]) => total_chapters <= chapters_read)
        .map(([volume_number]) => volume_number)
        .slice(-1);
    return volumes || 0;
}

export async function withUserId<T>(token: string, callback: (user_id: ObjectId) => Promise<T>) {
    const user_id = await getUserId(token);
    if (user_id == null) {
        return null;
    }

    return await callback(user_id);
}