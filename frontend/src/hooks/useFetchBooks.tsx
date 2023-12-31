import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Book } from "../types/Book";

export const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (newBook: Book) => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const { message, book } = await response.json();

      if (response.ok) {
        setBooks((prevBooks: Book[]) => [...prevBooks, book]);
        toast.success(message);
        await fetchBooks();
      } else {
        throw new Error(message || "Failed to add book");
      }
    } catch (error: any) {
      setError(error.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      const { message } = await response.json();

      if (response.ok) {
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
        toast.success(message);
      } else {
        throw new Error(message || "Failed to delete book");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete book");
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id: string | undefined, updatedBook: Book) => {
    if (id === undefined) return;
    try {
      setLoading(true);

      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      const { message, book: updated } = await response.json();

      if (response.ok) {
        const updatedBooks = books.map((book) =>
          book._id === id ? { ...book, ...updated } : book
        );
        setBooks(updatedBooks);
        toast.success(message);
      } else {
        throw new Error(message || "Failed to update book");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, addBook, deleteBook, updateBook, error };
};
