import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Book } from "../../types/Book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleBorrow = async () => {
    if (!user) {
      toast.error("You must Loggin to access the content");
      navigate("/signin");
      return;
    }

    try {
      if (book.availabilityStatus === "Available") {
        const borrowResponse = await fetch("/api/transaction/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.userId, bookId: book._id }),
        });

        const borrowData = await borrowResponse.json();
        if (borrowResponse.ok) {
          toast.success(borrowData.message);
        } else {
          toast.error(borrowData.message);
        }
      } else if (book.availabilityStatus === "Borrowed") {
        const returnResponse = await fetch("/api/transaction/return", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.userId, bookId: book._id }),
        });

        const returnData = await returnResponse.json();
        if (returnResponse.ok) {
          toast.success(returnData.message);
        } else {
          toast.error(returnData.message);
        }
      } else {
        toast.error("Book status doesn't allow borrowing or returning at the moment.");
      }
    } catch (error: any) {
      console.error("Error handling book status:", error);
      toast.error(`Error handling book status: ${error.message}`);
    }
  };

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg">
      <div className="relative h-64">
        <img
          src={book.imageURL}
          alt={`Cover of ${book.name}`}
          className="object-cover w-full h-full"
        />
        <span
          className={`absolute top-2 right-2 px-4 py-2 rounded-md ${
            book.availabilityStatus === "Borrowed"
              ? "bg-gray-800 text-sm text-white"
              : "bg-green-500 text-white text-sm"
          }`}
        >
          {book.availabilityStatus}
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{book.name}</h3>
        <p className="mb-2 text-sm text-gray-600">{book.author}</p>
        <button
          onClick={handleBorrow}
          className="w-full px-4 py-2 font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-800"
        >
          {book.availabilityStatus}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
