import { Request, Response } from "express";
import { bookModel } from "../model/book.model";
import { Document } from "mongoose";

interface bookType extends Document {
    title: string;
    author: string;
    year: Date;
}

interface updateResponse {
    message: string;
    book?: bookType;
}

const createBook = async (
    req: Request<{}, {}, bookType>,
    res: Response<{ message: string }>,
) => {
    try {
        const { title, author, year } = req.body;
        const existingBook = await bookModel.findOne({ title: title });

        if (existingBook) {
            res.status(400).json({ message: "book already exists" });
        }

        const newBook = await bookModel.create({ title, author, year });

        return res.status(200).json({ message: "book created succssfully" });
    } catch (error) {
        console.log("error creating book", error);
        return res.status(500).json({ message: "internal server error" });
    }
};

const updateBooks = async (
    req: Request<{ title: string }, {}, Partial<bookType>>,
    res: Response<updateResponse>,
) => {
    try {
        const { title } = req.params;
        const updatedBook = req.body;

        const book = await bookModel.findOneAndUpdate({ title }, updatedBook, {
            new: true,
        });

        if (!book) {
            return res.status(404).json({ message: "book not found" });
        }

        return res.status(200).json({ message: "bookupdated successfully",book });
    } catch (err) {
        console.log(`Error in updating books ${err}`);
        return res.status(500).json({ message: "server error" });
    }
};

const getAllBooks = async (
    req: Request,
    res: Response<{ message: string; book?: bookType[] }>,
) => {
    try {
        const books = await bookModel.find({});

        if (books.length != 0) {
            console.log("Books retrieved successfully", books);
            return res.json({ message: "book retrieved successfully" });
        } else {
            console.log("no books are there");
            return res.status(404).json({ message: "book doesnot exists" });
        }
    } catch (error) {
        console.log("error in retrieving books", error);
        res.status(500).json({ message: "server error in getting all books" });
    }
};

//by route /:name
const getSingleBook = async (
    req: Request<{ name: string }>,
    res: Response<bookType | { message: string }>,
) => {
    try {
        const { name } = req.params;
        const bookDetails = await bookModel
            .findOne({ name: name })
            .lean<bookType>();
        if (bookDetails) {
            console.log(`book exists ${bookDetails}`);
            return res.status(201).json(bookDetails);
        } else {
            console.log("book doesnot exists");
            return res.status(404).json({ message: "book doesnot exists" });
        }
    } catch {
        return res.status(500).json({ message: "server error " });
    }
};

const deleteAllBooks = async (
    req: Request,
    res: Response<{ message: string }>,
) => {
    try {
        const deleteBooks = await bookModel.deleteMany({});

        if (deleteBooks.deletedCount == 0) {
            return res.status(404).json({ message: "no books to delete" });
        }

        return res
            .status(200)
            .json({ message: `${deleteBooks.deletedCount} books are deleted` });
    } catch (error) {
        console.log("error in deleting the books", error);
        return res.status(500).json({ message: "server error" });
    }
};

const deleteSingleBooks = async (
    req: Request<{ title: string }, {}, {}>,
    res: Response<{ message: string }>,
) => {
    try {
        const { title } = req.params;

        const deletedBook = await bookModel.findOneAndDelete({ title });

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res
            .status(200)
            .json({ message: `Book '${title}' deleted successfully` });
    } catch (error) {
        console.log("error in deleting the books", error);
        return res.status(500).json({ message: "server error" });
    }
};

export {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBooks,
    deleteAllBooks,
    deleteSingleBooks,
};
