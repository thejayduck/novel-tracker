import mongoose, { Schema,Types } from "mongoose";

export interface ISession {
    _id: Types.ObjectId,
    user_id: Types.ObjectId,
    session_token: string,
    createdAt: Date,
    updatedAt: Date,
}

const sessionSchema = new mongoose.Schema<ISession>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  session_token: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Session: mongoose.Model<ISession & mongoose.Document> = mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;