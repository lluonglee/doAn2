"use client"; // Ensure this is a Client Component

import { usePathname } from "next/navigation"; // Import usePathname hook
import NavBar from "./home/navbar/page";
import Sidebar from "./home/sidebar/page";

export default function ClientLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  // Define routes where the NavBar and Sidebar should not be shown (e.g., for admin)
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <div className="main-container flex flex-row">
      {!isAdminPage && <Sidebar />} {/* Conditionally render Sidebar */}
      <div className="main-content w-full flex flex-col relative">
        {!isAdminPage && <NavBar />} {/* Conditionally render NavBar */}
        <div className={isAdminPage ? "" : "mt-16"}>{children}</div>
      </div>
    </div>
  );
}
