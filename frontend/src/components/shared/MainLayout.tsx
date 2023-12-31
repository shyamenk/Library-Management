import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import CatalogPage from "../../pages/Catalog";
import SignUp from "../../pages/SignUp";
import SignIn from "../../pages/Signin";
import UserProfile from "../../pages/UserProfile";
import BookManagement from "../../pages/admin/BookManagement";
import Dashboard from "../../pages/admin/Dashboard";
import TransactionManagement from "../../pages/admin/TransactionManagement";
import UserManagement from "../../pages/admin/UserManagement";
import AdminLayout from "./AdminLayout";
import SiteHeader from "./SiteHeader";

const MainLayout: React.FC = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  const isSignInOrSignUp =
    location.pathname.includes("signin") || location.pathname.includes("signup");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div>
      {user?.role === "Admin" ? (
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="admin/user-management" element={<UserManagement />} />
            <Route path="admin/book-management" element={<BookManagement />} />
            <Route path="admin/transaction-management" element={<TransactionManagement />} />
          </Routes>
        </AdminLayout>
      ) : (
        <>
          {!isSignInOrSignUp && <SiteHeader />}

          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/" element={<CatalogPage />} />
            <Route path="userProfile" element={<UserProfile />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default MainLayout;
