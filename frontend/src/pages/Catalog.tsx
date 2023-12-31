import React from "react";
import BookCard from "../components/books/BookCard";
import Alert from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";
import { useFetchBooks } from "../hooks/useFetchBooks";

const CatalogPage: React.FC = () => {
  const { books, loading, error } = useFetchBooks();

  if (loading) return <Spinner />;

  return (
    <div className="container px-4 py-6 mx-auto mt-8 md:px-8 lg:px-16">
      <h1 className="mb-4 text-2xl font-semibold">Browse Library Catalog</h1>
      {error ? (
        <Alert type="error" message={error} />
      ) : books.length === 0 ? (
        <Alert type="warning" message="Sorry, no books available." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
