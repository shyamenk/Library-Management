import React, { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import UserListHeader from "../../components/admin/users/UserListHeader";
import UserListItem from "../../components/admin/users/UserListItems";
import AddUserModal from "../../components/ui/AddUserModal";
import Spinner from "../../components/ui/Spinner";
import UpdateUserModal from "../../components/ui/UpdateUserModal";
import { useFetchUsers } from "../../hooks/useFetchUser";

export type User = {
  _id: string;
  username: string;
  name: string;
  role: "User" | "Admin";
  contactNumber: string;
};

const UserManagement: React.FC = () => {
  const { users, loading, deleteUser, updateUser, addUser } = useFetchUsers();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleEdit = (id: string) => {
    const user = users.find((user) => user._id === id);

    if (user) {
      setSelectedUser(user);
      setIsUpdateModalOpen(true);
    } else {
      setSelectedUser(undefined);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    if (selectedUser) {
      await updateUser(selectedUser._id, updatedUser);
      setOpenDropdown(null);
      setSelectedUser(undefined);
    }
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddUser = async (newUser: User) => {
    await addUser(newUser);
  };

  const renderUserList = () => (
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user: User) => (
        <UserListItem
          key={user._id}
          user={user}
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
              <h2 className="text-lg font-semibold">User Management</h2>
              <p className="mt-1 text-sm text-gray-700">
                This is a list of all Users available. You can add new Users, edit or delete
                existing ones.
              </p>
            </div>
            <button
              onClick={toggleModal}
              className="px-4 py-2 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Add New User
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <UserListHeader />
            {renderUserList()}
          </table>
        </div>
      </div>
      <AddUserModal isOpen={isModalOpen} onClose={toggleModal} handleAddUser={handleAddUser} />

      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        user={selectedUser}
        handleUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default UserManagement;
