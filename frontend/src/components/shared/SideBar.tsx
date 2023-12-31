import { ArrowRightLeft, Library, Settings, UserCog } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white ">
      <nav className="flex flex-col items-center flex-1 space-y-6">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <Link
          to="/admin/user-management"
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            location.pathname === "/admin/user-management" ? "bg-brand/80 text-white" : ""
          }`}
        >
          <UserCog size={24} />
        </Link>

        <Link
          to="/admin/book-management"
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            location.pathname === "/admin/book-management" ? "bg-brand/80 text-white" : ""
          }`}
        >
          <Library size={24} />
        </Link>

        <Link
          to="/admin/transaction-management"
          className={`rounded-lg p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none ${
            location.pathname === "/admin/transaction-management" ? "bg-brand/80 text-white" : ""
          }`}
        >
          <ArrowRightLeft size={24} />
        </Link>
      </nav>

      <div className="flex flex-col items-center space-y-6">
        <Link
          to="#"
          className="rounded-lg bg-gray-100 p-1.5 text-gray-700 transition-colors duration-200 focus:outline-none"
        >
          <Settings size={24} />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
