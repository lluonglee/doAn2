// components/AdminLayout.js
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="main-container flex flex-row">
      <Sidebar />
      <div className="main-content w-full flex flex-col  relative">
        {/* Navbar */}
        <Navbar />
        <div className="mt-16">
          {" "}
          {/* Adjust 'mt-16' according to your Navbar height */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
