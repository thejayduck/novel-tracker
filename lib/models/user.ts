import mongoose, { ObjectId } from 'mongoose'

export interface IUser {
    _id: ObjectId,
    google_user_id: number
    username: string | null,
    moderation_level: number,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new mongoose.Schema<IUser>({
    google_user_id: { type: Number, required: true },
    username: { type: String, default: null },
    moderation_level: { type: Number, default: 0 },
}, { timestamps: true });

const User: mongoose.Model<IUser & mongoose.Document> = mongoose.models.User || mongoose.model('User', userSchema);

export default User;