"use client";
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap icons
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
      const response = await fetch("http://localhost:5000/api/teacher/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Clear token from localStorage or any other storage
        localStorage.removeItem("accessToken");
        router.push("/login"); // Redirect to login page after successful logout
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="sidebar w-1/5 relative">
      {/* Sidebar nội dung ở đây */}
      <span
        className="absolute text-white text-3xl cursor-pointer top-5 left-5" // Đặt nút bên trong sidebar
        onClick={toggleSidebar}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>
      {isSidebarOpen && (
        <div className="sidebar h-[100vh]  p-2 w-[300px]  text-center bg-gray-900 relative">
          <span
            className="absolute text-white text-3xl cursor-pointer top-5 left-5" // Đặt nút bên trong sidebar
            onClick={toggleSidebar}
          >
            <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
          </span>
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                TailwindCSS
              </h1>
              <i
                className="bi bi-x cursor-pointer ml-28 lg:hidden"
                onClick={toggleSidebar}
              ></i>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              <Link href="/">Home</Link>
            </span>
          </div>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={toggleDropdown}
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Quản lý đào tạo
              </span>
              <span
                className={`text-sm transition-transform ${
                  isDropdownOpen ? "rotate-0" : "rotate-180"
                }`}
                id="arrow"
              >
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          {isDropdownOpen && (
            <div
              className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
              id="submenu"
            >
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                <Link href="/admin/danhMuc">Danh mục</Link>
              </h1>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                <Link href="/admin/daoTao">Chương trình đào tạo</Link>
              </h1>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                <Link href="/admin/capDo">Cấp độ</Link>
              </h1>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                <Link href="/admin/lopHoc">Lớp học</Link>
              </h1>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                <Link href="/admin/hocVien">Học viên</Link>
              </h1>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                <Link href="/admin/lichHoc">Lịch học</Link>
              </h1>
            </div>
          )}
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
