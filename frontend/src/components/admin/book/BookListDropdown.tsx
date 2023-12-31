import { X } from "lucide-react";
import React from "react";

interface DropdownProps {
  isOpen: boolean;
  bookId: string;
  handleEdit: (id: string) => void;
  toggleDropdown: (id: string) => void;
  handleDelete: (id: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  bookId,
  handleEdit,
  handleDelete,
  toggleDropdown,
}) => (
  <>
    {isOpen && (
      <div className="absolute right-0 z-30 w-64 p-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="flex justify-between px-4 py-2 rounded-t-lg bg-gray-50">
          <span className="text-base font-medium">Action</span>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => toggleDropdown(bookId)}
          >
            <X />
          </button>
        </div>
        <div className="py-1" role="none">
          <button
            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => handleEdit(bookId)}
          >
            Edit Book
          </button>
          <button
            className="block w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-100 hover:text-red-900"
            role="menuitem"
            onClick={() => handleDelete(bookId)}
          >
            Delete Book
          </button>
        </div>
      </div>
    )}
  </>
);

export default Dropdown;
