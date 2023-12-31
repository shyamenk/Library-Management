import React from "react";
import { useForm } from "react-hook-form";
import { User } from "../../pages/admin/UserManagement";
import InputField from "./InputField";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddUser: (newUser: User) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, handleAddUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    await handleAddUser(data);
    onClose();
    reset();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="p-8 bg-white rounded-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Add New User</h2>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="mb-4 space-y-4">
            <InputField
              id="username"
              label="Username"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              {...register("username", { required: true })}
            />
            {errors.username && <span className="text-red-500">Username is required</span>}
            <InputField
              id="name"
              label="Name"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-500">Name is required</span>}
            <InputField
              id="role"
              label="Role"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              {...register("role", { required: true })}
            />
            {errors.role && <span className="text-red-500">Role is required</span>}
            <InputField
              id="contactNumber"
              label="Contact Number"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              {...register("contactNumber", { required: true })}
            />
            {errors.contactNumber && (
              <span className="text-red-500">Contact Number is required</span>
            )}
          </div>

          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md">
              Add User
            </button>
            <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
