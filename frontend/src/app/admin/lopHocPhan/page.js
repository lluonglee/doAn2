"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalLopHocPhan from "./ModalLopHocPhan";

export default function GiangVien() {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]); // State to hold courses data
  const [selectedCourse, setSelectedCourse] = useState(null); // State to hold selected course for editing

  // Hàm để mở modal
  const openModal = (course = null) => {
    setSelectedCourse(course); // Set the course data if editing, or null if adding new
    setIsOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => setIsOpen(false);

  // Fetch courses data from the backend
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/course/get-all");
      const data = await res.json();
      if (data.status === "OK") {
        setCourses(data.data); // Assuming data.data contains the array of courses
      } else {
        console.error("Failed to fetch Courses:", data.message);
      }
    } catch (error) {
      console.error("Error fetching Courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch courses on component mount
  }, [isOpen]); // Re-fetch when modal is closed

  // Helper function to format TKB (Thời khóa biểu)
  const formatTkb = (tkb) => {
    if (!tkb || tkb.length === 0) return "N/A";
    return tkb
      .map((slot) => `Thứ ${slot.thu} (Tiết: ${slot.tiet}, Giờ: ${slot.gio})`)
      .join(", ");
  };

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách lớp học phần</h2>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => openModal()}
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
                  Mã lớp học phần
                </th>
                <th scope="col" className="px-6 py-3">
                  Sĩ số
                </th>
                <th scope="col" className="px-6 py-3">
                  Số tiết trực tiếp
                </th>
                <th scope="col" className="px-6 py-3">
                  Số tiết tổng
                </th>
                <th scope="col" className="px-6 py-3">
                  Loại môn học
                </th>
                <th scope="col" className="px-6 py-3">
                  Thời khóa biểu
                </th>
                <th scope="col" className="px-6 py-3">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {course.ma_lop_hoc_phan}
                  </th>
                  <td className="px-6 py-4">{course.si_so}</td>
                  <td className="px-6 py-4">{course.so_tiet_truc_tiep}</td>
                  <td className="px-6 py-4">{course.so_tiet_tong}</td>
                  <td className="px-6 py-4">{course.loai_mon_hoc}</td>
                  <td className="px-6 py-4">{formatTkb(course.tkb)}</td>
                  <td className="px-6 py-4 flex gap-5 justify-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => openModal(course)}
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
      {isOpen && <ModalLopHocPhan closeModal={closeModal} course={selectedCourse} />}
    </div>
  );
}
