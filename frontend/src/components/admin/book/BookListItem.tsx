import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Book } from "../../../types/Book";
import Dropdown from "./BookListDropdown";

interface BookListItemProps {
  book: Book;
  openDropdown: string | null;
  toggleDropdown: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const getStatus = (availabilityStatus: string) => {
  let statusText;
  let statusColor;

  switch (availabilityStatus.toLowerCase()) {
    case "available":
      statusText = "Available";
      statusColor = "bg-green-100";
      break;
    case "borrowed":
      statusText = "Borrowed";
      statusColor = "bg-red-100";
      break;
    default:
      statusText = "Unknown";
      statusColor = "bg-blue-100";
  }

  return { statusText, statusColor };
};

const StatusBadge: React.FC<{ statusText: string; statusColor: string }> = ({
  statusText,
  statusColor,
}) => <span className={`px-2 py-1 rounded ${statusColor}`}>{statusText}</span>;

const BookListItem: React.FC<BookListItemProps> = ({
  book,
  openDropdown,
  toggleDropdown,
  handleEdit,
  handleDelete,
}) => {
  const { statusText, statusColor } = getStatus(book.availabilityStatus);

  return (
    <tr key={book._id}>
      <td className="px-6 py-4 text-sm text-gray-600">{book._id}</td>
      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{book.name}</td>
      <td className="px-6 py-4 text-xs font-medium text-gray-700 whitespace-nowrap">
        <StatusBadge statusText={statusText} statusColor={statusColor} />
      </td>
      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
        <Dropdown
          bookId={book._id}
          toggleDropdown={toggleDropdown}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isOpen={openDropdown === book._id}
        />
        <button type="button" onClick={() => toggleDropdown(book._id)} className="text-gray-700">
          <MoreHorizontal />
        </button>
      </td>
    </tr>
  );
};

export default BookListItem;
