import React, { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import BookListHeader from "../../components/admin/book/BookListHeader";
import BookListItem from "../../components/admin/book/BookListItem";
import AddBookModal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";
import UpdateBookModal from "../../components/ui/UpdateModal";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import { Book } from "../../types/Book";

const BookManagement: React.FC = () => {
  const { books, loading, deleteBook, updateBook, addBook } = useFetchBooks();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  const handleEdit = (id: string) => {
    const book = books.find((book) => book._id === id);

    if (book) {
      setSelectedBook(book);
      setIsUpdateModalOpen(true);
    } else {
      setSelectedBook(undefined);
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    if (selectedBook) {
      await updateBook(selectedBook._id, updatedBook);
      setOpenDropdown(null);
      setSelectedBook(undefined);
    }
  };

  const handleDelete = (id: string) => {
    deleteBook(id);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddBook = async (newBook: Book) => {
    await addBook(newBook);
  };

  const renderBookList = () => (
    <tbody className="bg-white divide-y divide-gray-200">
      {books.map((book: Book) => (
        <BookListItem
          key={book._id}
          book={book}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </tbody>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-10 py-8 bg-white">
      <AdminHeader />
      <hr />
      <div className="flex flex-col w-full bg-gray">
        <div className="w-full mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold">Book Management</h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all Books availablw. You can add new Books, edit or delete
                existing ones.
              </p>
            </div>
            <button
              onClick={toggleModal}
              className="px-4 py-2 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Add New Book
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <BookListHeader />
            {renderBookList()}
          </table>
        </div>
      </div>
      <AddBookModal isOpen={isModalOpen} onClose={toggleModal} handleAddBook={handleAddBook} />

      <UpdateBookModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        book={selectedBook}
        handleUpdate={handleUpdateBook}
      />
    </div>
  );
};

export default BookManagement;
