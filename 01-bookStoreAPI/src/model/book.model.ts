import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "book title is must"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "author name is required"],
            trim: true,
        },
        year: {
            type: Date,
            required: true,
            max: [Date.now(), "date cannot be future"],
        },
    },
    { timestamps: true },
);

const bookModel =  mongoose.model("book",bookSchema)

export {bookModel}
