import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User } from "../pages/admin/UserManagement";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser: User) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const { message, user } = await response.json();

      if (response.ok) {
        setUsers((prevUsers: User[]) => [...prevUsers, user]);
        toast.success(message);
        await fetchUsers();
      } else {
        throw new Error(message || "Failed to add user");
      }
    } catch (error: any) {
      setError(error.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const { message } = await response.json();

      if (response.ok) {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
        toast.success(message);
      } else {
        throw new Error(message || "Failed to delete user");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string | undefined, updatedUser: User) => {
    if (id === undefined) return;

    console.log(updateUser);

    try {
      setLoading(true);

      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const { message, user: updated } = await response.json();

      if (response.ok) {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, ...updated } : user
        );
        setUsers(updatedUsers);
        toast.success(message);
      } else {
        throw new Error(message || "Failed to update user");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, addUser, deleteUser, updateUser, error };
};
