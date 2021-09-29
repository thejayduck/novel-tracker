import mongoose, { Schema, Types } from "mongoose";

export interface IUserProgress {
  book_id: Types.ObjectId,
  chapters: number,
  volumes: number,
  tracking_status: string,
}

export interface IUser {
  _id: Types.ObjectId,
  google_user_id: number
  username: string | null,
  moderation_level: number,
  createdAt: Date,
  updatedAt: Date,
  books: [IUserProgress],
}

const userProgressSchema = new mongoose.Schema<IUserProgress>({
  book_id: {
    type: Schema.Types.ObjectId,
    ref: "Book"
  },
  chapters: {
    type: Number,
    required: true,
  },
  volumes: {
    type: Number,
    required: true,
  },
  tracking_status: {
    type: String,
    default: "Reading"
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

const User: mongoose.Model<IUser & mongoose.Document> = mongoose.models.User || mongoose.model("User", userSchema);
const UserProgress: mongoose.Model<IUserProgress & mongoose.Document> = mongoose.models.UserProgress || mongoose.model("UserProgress", userProgressSchema);

export default User;
export { UserProgress };