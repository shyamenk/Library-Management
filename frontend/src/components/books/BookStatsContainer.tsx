import { BookOpen, Bookmark, Users } from "lucide-react";
import { Book } from "../../types/Book";
import BookStats from "./BookStats";

interface BookStatsContainerProps {
  books: Book[];
}

const BookStatsContainer: React.FC<BookStatsContainerProps> = ({ books }) => {
  //   if (!books || !Array.isArray(books)) {
  //     // Handling for cases where 'books' is not an array or is null/undefined
  //     return null; // or appropriate handling/logic
  //   }

  const availableBooks = books.filter((book) => book.availabilityStatus === "available").length;
  const borrowedBooks = books.filter((book) => book.availabilityStatus === "borrowed").length;

  return (
    <div className="flex mt-8 space-x-8">
      <BookStats
        label="Total Books"
        count={books.length}
        color="blue-500"
        icon={<Bookmark size={20} className="text-brand" />}
      />
      <BookStats
        label="Available Books"
        count={availableBooks}
        color="green-500"
        icon={<BookOpen size={20} className="text-brand" />}
      />
      <BookStats
        label="Borrowed Books"
        count={borrowedBooks}
        color="red-500"
        icon={<Users size={20} className="text-brand" />}
      />
    </div>
  );
};

export default BookStatsContainer;
