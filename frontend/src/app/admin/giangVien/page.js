"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalGiangVien from "./ModalGiangVien";

export default function GiangVien() {
  const [isOpen, setIsOpen] = useState(false);
  const [teachers, setTeachers] = useState([]); // State to hold teachers data

  // Hàm để mở modal
  const openModal = () => setIsOpen(true);

  // Hàm để đóng modal
  const closeModal = () => setIsOpen(false);

  // Fetch teachers data from the backend
  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teacher/get-all");
      const data = await res.json();
      if (data.status === "OK") {
        setTeachers(data.data); // Assuming data.data contains the array of teachers
      } else {
        console.error("Failed to fetch teachers:", data.message);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers(); // Call the function to fetch teachers on component mount
  }, [isOpen]);

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách giảng viên</h2>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={openModal}
          >
            Thêm mới
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên giảng viên
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Khoa chuyên môn
                </th>
                <th scope="col" className="px-6 py-3">
                  Ghi chú
                </th>
                <th scope="col" className="px-6 py-3">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {teacher.ten}
                  </th>
                  <td className="px-6 py-4">{teacher.email}</td>
                  <td className="px-6 py-4">{teacher.khoa_chuyen_mon}</td>
                  <td className="px-6 py-4">{teacher.ghi_chu}</td>
                  <td className="px-6 py-4 flex gap-5 justify-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={openModal}
                    >
                      Edit
                    </a>
                    <Trash2 className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Gọi modal */}
      {isOpen && <ModalGiangVien closeModal={closeModal} />}
    </div>
  );
}
