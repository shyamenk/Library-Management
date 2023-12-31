import { MoreHorizontal } from "lucide-react";
import React from "react";
import { User } from "../../../pages/admin/UserManagement";
import Dropdown from "./UserListBropDown";

interface BookListItemProps {
  user: User;
  openDropdown: string | null;
  toggleDropdown: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const UserListItem: React.FC<BookListItemProps> = ({
  user,
  openDropdown,
  toggleDropdown,
  handleEdit,
  handleDelete,
}) => {
  return (
    <tr key={user._id}>
      <td className="px-6 py-4 text-sm text-gray-600">{user._id}</td>
      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user.username}</td>
      <td className="px-6 py-4 text-xs font-medium text-gray-700 whitespace-nowrap">{user.role}</td>
      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
        <Dropdown
          bookId={user._id}
          toggleDropdown={toggleDropdown}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isOpen={openDropdown === user._id}
        />
        <button type="button" onClick={() => toggleDropdown(user._id)} className="text-gray-700">
          <MoreHorizontal />
        </button>
      </td>
    </tr>
  );
};

export default UserListItem;
