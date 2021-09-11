import { randomBytes } from 'crypto';
import mongoose, { Types } from 'mongoose';

import { Book, BookSubmission,IBook } from './models/book';
import Session from './models/session';
import User, { IUserProgress, UserProgress } from './models/user';

export async function connectDb() {
    if (mongoose.connection.readyState == 0) {
        console.log("Connecting to MongoDB");
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
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

export async function getUserId(session_token: string): Promise<Types.ObjectId | null> {
    return await Session.findOne({ session_token }).then(session => session && session.user_id);
}

export async function getUserInfo(user_id: Types.ObjectId) {
    return await User.findById(user_id);
}

export async function setUsername(user_id: Types.ObjectId, username: string) {
    await User.findByIdAndUpdate(user_id, { username }, { runValidators: true });
}

export async function submitBook(bookDetails: IBook, submitted_by: Types.ObjectId) {
    return await new BookSubmission({ ...bookDetails, submitted_by, denied: false }).save().then(book => book._id);
}

export async function getBook(book_id: Types.ObjectId) {
    return await Book.findById(book_id);
}

export async function searchBook(query: string) {
    return await Book.find({
        $or: [
            {
                title_native: new RegExp(query, 'gi'),
            },
            {
                title_romanized: new RegExp(query, 'gi'),
            },
            {
                title_english: new RegExp(query, 'gi'),
            }
        ]
    });
}

export async function getPendingBooks() {
    return await BookSubmission.find({ denied: false });
}

export async function getPendingBook(submission_id: Types.ObjectId) {
    return await BookSubmission.findOne({ _id: submission_id, denied: false });
}

export async function acceptBook(submission_id: Types.ObjectId) {
    const submission = (await BookSubmission.findByIdAndDelete(submission_id)).toObject();
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

export async function getUserBookInfos(user_id: Types.ObjectId): Promise<(IUserProgress)[]> {
    return await User.findById(user_id).then(async (user) => await user.execPopulate()).then(user => user.books);
}

export async function addUserBooks(user_id: Types.ObjectId, book_id: Types.ObjectId) {
    await User.findByIdAndUpdate(user_id, {
        $push: {
            books: new UserProgress({
                book_id,
                chapters: 0,
                volumes: 0,
            }),
        }
    })
}

export async function deleteUserBooks(user_id: Types.ObjectId, book_id: Types.ObjectId) {
    await User.findByIdAndUpdate(user_id, {
        $pull: {
            books: {
                book_id,
            }
        }
    })
}

export async function updateUserBookChaptersRead(user_id: Types.ObjectId, book_id: Types.ObjectId, new_chapters_read: number) {
    const new_volumes_read = await getVolumeForChapters(book_id, new_chapters_read);
    await User.findOneAndUpdate(
        { "_id": user_id, "books._id": book_id },
        {
            "$set": {
                "books.$.chapters": new_chapters_read,
                "books.$.volumes": new_volumes_read,
            }
        }
    );
}

export async function getVolumeForChapters(book_id: Types.ObjectId, chapters_read: number) {
    const book = await Book.findById(book_id);

    let total_chapters = 0;
    for (let i = 0; i < book.volumes.length; i++) {
        const volume = book.volumes[i];

        if (total_chapters >= chapters_read) {
            return i;
        }
        total_chapters += volume.chapters + volume.extras;
    }
}

export async function withUserId<T>(token: string, callback: (user_id: Types.ObjectId) => Promise<T>) {
    const user_id = await getUserId(token);
    if (user_id == null) {
        return null;
    }

    return await callback(user_id);
}