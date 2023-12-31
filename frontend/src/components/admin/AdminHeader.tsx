import { useAuth } from "../../context/authContext";

const AdminHeader = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col mb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="lg:flex lg:items-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-700 lg:mb-0">
            Hello, <span className="text-brand">Admin!</span>
          </h1>
          <span className="font-semibold text-gray-700 text-md lg:ml-4">
            Wednesday, Dec 27, 2023, 5:12 PM
          </span>
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className="px-4 py-2 text-sm font-normal text-white rounded-md bg-brand"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
