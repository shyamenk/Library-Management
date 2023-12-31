import React, { ReactNode } from "react";
import Sidebar from "../shared/SideBar";

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
};

export default AdminLayout;
