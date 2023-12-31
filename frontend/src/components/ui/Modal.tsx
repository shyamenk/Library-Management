import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import { Book } from "../../types/Book";
import InputField from "./InputField";

const schema = z.object({
  name: z.string().min(3).max(50).nonempty(),
  author: z.string().min(3).max(50).nonempty(),
  imageURL: z.string().url(),
});

interface FormValues {
  name: string;
  author: string;
  imageURL: string;
}

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddBook: (newBook: Book) => Promise<void>;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, handleAddBook }) => {
  const { addBook, loading } = useFetchBooks();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await handleAddBook(data as Book);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="p-8 bg-white rounded-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Add New Book</h2>
            <button type="button" onClick={onClose}>
              <X size={24} className="text-gray-600 cursor-pointer" />
            </button>
          </div>
          <div className="mb-4 space-y-4 ">
            <InputField
              id="name"
              label="Name"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              {...register("name")}
            />
            {errors.name && <span className="text-red-500">Name is required</span>}
            <InputField
              id="author"
              label="Author"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              {...register("author")}
            />
            {errors.author && <span className="text-red-500">Author is required</span>}
            <InputField
              id="imageURL"
              label="Image URL"
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              {...register("imageURL")}
            />
            {errors.imageURL && <span className="text-red-500">Enter a valid URL</span>}
          </div>

          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md">
              Add Book
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

export default AddBookModal;
