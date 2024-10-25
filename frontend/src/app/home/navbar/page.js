"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Import đúng cách

export default function NavBar() {
  const [teacher, setTeacher] = useState({ name: "", email: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      fetchTeacher(decodedToken, token);
    }
  }, []);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  // Hàm fetch  giảng viên login từ backend
  const fetchTeacher = async (decodedToken, token) => {
    try {
      const token = localStorage.getItem("accessToken"); // Get the token
      const res = await fetch(
        `http://localhost:5000/api/teacher/get-detail/${decodedToken.id}`,
        {
          method: "GET",
          headers: {
            token: `Bearer ${token}`, // Include the token in the headers
            "Content-Type": "application/json", // Optional, depends on your API
          },
        }
      );
      const data = await res.json();
      if (res.ok && data.status === "OK") {
        setTeacher({ name: data.data.ten, email: data.data.email });
      } else {
        console.error("Failed to fetch teachers:", data.message);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  return (
    <nav className="bg-blue-900 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </Link>

        <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  src="https://w7.pngwing.com/pngs/627/97/png-transparent-avatar-web-development-computer-network-avatar-game-web-design-heroes.png"
                  alt="user photo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 z-50">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {teacher.name || "User Name"}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {teacher.email || "user@example.com"}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Earnings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-4 py-2"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
