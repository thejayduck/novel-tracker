import mongoose, { ObjectId } from 'mongoose'

export interface IUserProgress {
    chapters: number,
    volumes: number,
}

export interface IUser {
    _id: ObjectId,
    google_user_id: number
    username: string | null,
    moderation_level: number,
    createdAt: Date,
    updatedAt: Date,
    books: [IUserProgress],
}

const userProgressSchema = new mongoose.Schema<IUserProgress>({
    chapters: {
        type: Number,
        required: true,
    },
    volumes: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const userSchema = new mongoose.Schema<IUser>({
    google_user_id: { type: Number, required: true },
    username: { type: String, default: null },
    moderation_level: { type: Number, default: 0 },
    books: {
        type: [userProgressSchema],
        default: [],
    }
}, { timestamps: true });

const User: mongoose.Model<IUser & mongoose.Document> = mongoose.models.User || mongoose.model('User', userSchema);

export default User;