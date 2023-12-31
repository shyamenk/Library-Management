import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Book } from "../../types/Book";
import InputField from "./InputField";

const bookSchema = z.object({
  name: z.string(),
  author: z.string(),
  imageURL: z.string().url(),
});

type BookForm = z.infer<typeof bookSchema>;

interface UpdateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | undefined;
  handleUpdate: (updatedBook: Book) => void;
}

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({
  isOpen,
  onClose,
  book,
  handleUpdate,
}) => {
  const { handleSubmit, register, formState, setValue } = useForm<BookForm>({
    resolver: zodResolver(bookSchema),
    defaultValues: book || {},
  });

  React.useEffect(() => {
    if (book) {
      setValue("name", book.name);
      setValue("author", book.author);
      setValue("imageURL", book.imageURL);
    }
  }, [book, setValue]);

  const onSubmit = (data: BookForm) => {
    const updatedBook = {
      ...book,
      ...data,
    };
    handleUpdate(updatedBook as Book);
    onClose();
  };

  if (!isOpen || !book) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="p-8 bg-white rounded-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 space-y-4">
            <InputField label="Name" id="name" {...register("name")} />
          </div>
          <div className="mb-4 space-y-4">
            <InputField label="Author" id="author" {...register("author")} />
          </div>
          <div className="mb-4 space-y-4">
            <InputField label="Image URL" id="imageURL" {...register("imageURL")} />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? "Updating..." : "Update Book"}
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

export default UpdateBookModal;
