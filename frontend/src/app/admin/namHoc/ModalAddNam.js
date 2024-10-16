"use client";
import React, { useState, useEffect } from "react";

export default function ModalNam({ closeModal }) {
  const [formData, setFormData] = useState({
    semesterId: "",
    courseId: "",
  });

  const [semesters, setSemester] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh sách giáo viên
    const fetchSemester = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/semester/get-all");
        const data = await res.json();
        setSemester(data.data);
      } catch (error) {
        console.error("Failed to fetch Semester:", error);
      }
    };
    // Gọi API để lấy danh sách khóa học
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/course/get-all"); // API courses
        const data = await res.json();
        setCourses(data.data); // Lưu danh sách khóa học vào state
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchSemester();
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem đã chọn Năm học và Khóa học chưa
    if (!formData.semesterId || !formData.courseId) {
      alert("Vui lòng chọn Năm học và Khóa học.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/assign/assign-semester",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Gửi dữ liệu dưới dạng JSON
        }
      );

      const result = await response.json();
      if (result.status === "OK") {
        alert("Khóa học đã được liên kết thành công với Năm học!");
        closeModal(); 
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Failed to link Course and Semester:", error);
      alert("Đã xảy ra lỗi khi liên kết Khóa học với Năm học.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Thêm năm học
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                {/* Dropdown cho giáo viên */}
                <div className="col-span-2">
                  <label
                    htmlFor="semesterId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Năm Học
                  </label>
                  <select
                    name="semesterId"
                    id="semesterId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    value={formData.semesterId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn Năm học --</option>
                    {semesters.map((semester) => (
                      <option key={semester._id} value={semester._id}>
                        {`${semester.hoc_ky} - ${semester.nam_hoc}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown cho khóa học */}
                <div className="col-span-2">
                  <label
                    htmlFor="courseId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Khóa học
                  </label>
                  <select
                    name="courseId"
                    id="courseId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    value={formData.courseId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn Lớp học phần --</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.ma_lop_hoc_phan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thêm mới
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
