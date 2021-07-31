import { randomBytes } from 'crypto';
import mongoose, { Types } from 'mongoose';
import User, { IUserProgress } from './models/user';
import Session from './models/session';
import { IBook, Book, BookSubmission } from './models/book';

console.log("Connecting to MongoDB");
if (mongoose.connection.readyState == 0) {
    const connection_string = `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@pc.nobbele.dev:5829/noveltracker?authSource=admin&w=1`;
    mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
}

export async function createUserFromGoogle(gui: number): Promise<null | Types.ObjectId> {
    return await new User({ google_user_id: gui }).save().then(user => user._id);
}

export async function findUserIdFromGoogle(gui: number): Promise<null | Types.ObjectId> {
    return await User.findOne({ google_user_id: gui }).then(user => user && user._id);
}

export async function createSession(user_id: Types.ObjectId) {
    const session_token = randomBytes(32).toString('hex');
    return await new Session({ user_id, session_token }).save().then(session => session.session_token);
}

export async function deleteSession(session_token: string) {
    await Session.deleteOne({ session_token });
}

export async function getUserId(session_token: string) {
    return await Session.findOne({ session_token }).then(session => session && session.user_id);
}

export async function getUserInfo(user_id: Types.ObjectId) {
    return await User.findById(user_id);
}

export async function setUsername(user_id: Types.ObjectId, username: string) {
    await User.findByIdAndUpdate(user_id, { username }, { runValidators: true });
}

export async function submitBook(bookDetails: IBook, submitted_by: Types.ObjectId) {
    return await new BookSubmission({ ...bookDetails, submitted_by }).save().then(book => book._id);
}

export async function getBook(book_id: Types.ObjectId) {
    return await Book.findById(book_id);
}

export async function getPendingBooks() {
    return await BookSubmission.find({ denied: false });
}

export async function getPendingBook(submission_id: Types.ObjectId) {
    return await BookSubmission.findOne({ _id: submission_id, denied: false });
}

export async function acceptBook(submission_id: Types.ObjectId) {
    const submission = (await BookSubmission.findOneAndDelete(submission_id)).toObject();
    delete submission.submitted_by;
    delete submission.denied;
    await new Book(submission).save();
}

export async function denyBook(submission_id: Types.ObjectId) {
    await BookSubmission.findByIdAndUpdate(submission_id, { denied: true });
}

export async function getBookVolumes(book_id: Types.ObjectId) {
    return await Book.findById(book_id).then(book => book && book.volumes);
}

export async function getUserBooks(user_id: Types.ObjectId): Promise<IUserProgress[]> {
    return await User.findById(user_id).then(user => user.books);
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

export async function withUserId<T>(token: string, callback: (user_id: Types.ObjectId) => Promise<T>) {
    const user_id = await getUserId(token);
    if (user_id == null) {
        return null;
    }

    return await callback(user_id);
}