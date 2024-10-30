"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalLopHocPhan from "./ModalLopHocPhan";

export default function LopHocPhan() {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5); // Number of courses per page

  // Hàm để mở modal
  const openModal = (course = null) => {
    setSelectedCourse(course);
    setIsOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => setIsOpen(false);

  // Fetch courses data from the backend
  const fetchCourses = async (page = 1) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/course/get-all?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data.status === "OK") {
        setCourses(data.data);
        setTotalPages(data.totalPages); // Set total pages from the response
        setCurrentPage(data.currentPage); // Set the current page
      } else {
        console.error("Failed to fetch Courses:", data.message);
      }
    } catch (error) {
      console.error("Error fetching Courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage); // Fetch courses on component mount or when page changes
  }, [isOpen, isDelete, currentPage]); // Re-fetch when modal is closed or currentPage changes

  // Function to delete a course
  const deleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/course/delete-course/${courseId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.status === "OK") {
          alert("Course deleted successfully!");
          fetchCourses(currentPage); // Refresh the courses list
        } else {
          alert("Failed to delete course: " + data.message);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  // Helper function to format TKB (Thời khóa biểu)
  const formatTkb = (tkb) => {
    if (!tkb || tkb.length === 0) return "N/A";
    return tkb
      .map((slot) => `Thứ ${slot.thu} (Tiết: ${slot.tiet}, Giờ: ${slot.gio})`)
      .join(", ");
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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
                    <Trash2
                      className="cursor-pointer  text-red-600"
                      onClick={() => {
                        setDelete(!isDelete);
                        return deleteCourse(course._id);
                      }} // Call delete function
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Gọi modal */}
      {isOpen && (
        <ModalLopHocPhan closeModal={closeModal} course={selectedCourse} />
      )}
    </div>
  );
}
