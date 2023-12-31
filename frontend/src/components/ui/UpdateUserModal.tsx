import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "../../pages/admin/UserManagement";
import InputField from "./InputField";

const userSchema = z.object({
  username: z.string(),
  name: z.string(),
  role: z.string().optional(),
  contactNumber: z.string().optional(),
});

type UserForm = z.infer<typeof userSchema>;

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | undefined;
  handleUpdate: (updatedUser: User) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  user,
  handleUpdate,
}) => {
  const { handleSubmit, register, formState, setValue } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: user || {},
  });

  React.useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("name", user.name);
      setValue("role", user.role);
      setValue("contactNumber", user.contactNumber);
    }
  }, [user, setValue]);

  const onSubmit = (data: UserForm) => {
    const updatedUser = {
      ...user,
      ...data,
    };
    handleUpdate(updatedUser as User);
    onClose();
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="p-8 bg-white rounded-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 space-y-4">
            <InputField label="Username" id="username" {...register("username")} />
          </div>
          <div className="mb-4 space-y-4">
            <InputField label="Name" id="name" {...register("name")} />
          </div>

          <div className="mb-4 space-y-4">
            <InputField label="Role" id="role" {...register("role")} />
          </div>

          <div className="mb-4 space-y-4">
            <InputField label="Contact Number" id="contactNumber" {...register("contactNumber")} />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? "Updating..." : "Update User"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md"
              disabled={formState.isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
