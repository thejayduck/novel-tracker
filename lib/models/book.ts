import mongoose, { ObjectId } from 'mongoose'

export interface IVolume {
    cover_url: string,
    chapters: number,
    extras: number,
}

export interface IBook {
    _id: ObjectId,
    title_english: string,
    title_romanized: string,
    title_native: string,
    description: string,
    author: string,
    cover_url: string,
    banner_url: string,
    release_status: string,
    start_date: Date,
    end_date: Date,
    volumes: [IVolume]
}

const volumeSchema = new mongoose.Schema({
    cover_url: {
        type: String,
        required: true,
    },
    chapters: {
        type: Number,
        required: true,
    },
    extras: {
        type: Number,
        required: true,
    },
});
const bookSchema = new mongoose.Schema<IBook>({
    /* TODO */
    volumes: {
        type: [volumeSchema],
        required: true,
    }
}, { timestamps: true });

const Book: mongoose.Model<IBook & mongoose.Document> = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;