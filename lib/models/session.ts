import mongoose, { ObjectId } from 'mongoose'

export interface ISession {
    _id: ObjectId,
    user_id: ObjectId,
    session_token: string,
    createdAt: Date,
    updatedAt: Date,
}

const sessionSchema = new mongoose.Schema<ISession>({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    session_token: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Session: mongoose.Model<ISession & mongoose.Document> = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;