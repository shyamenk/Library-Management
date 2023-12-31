import Book from "../models/Book.js";

const BookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addBook: async (req, res) => {
    try {
      const { name, author } = req.body;

      const existingBook = await Book.findOne({ name, author });
      if (existingBook) {
        return res.status(400).json({ message: "This book already exists" });
      }

      const book = await Book.create(req.body);
      res.status(201).json({ book, message: "Book added successfully" });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: error.message });
    }
  },

  updateBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ book, message: "Book updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const deletedBook = await Book.findByIdAndDelete(bookId);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default BookController;
