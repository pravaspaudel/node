import mongoose from "mongoose";

export type movieType = {
    title: string;
    released: number;
    director: string;
    rating: number;
    cast?: string[];
    language?: string;
    country?: string;
    description?: string;
};

const movieSchema = new mongoose.Schema<movieType>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    released: {
        type: Number,
        required: true,
    },
    director: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    },
    cast: {
        type: [String],
        default: [],
    },
    language: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
});

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;
