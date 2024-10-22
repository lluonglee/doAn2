"use client";
import React, { useState, useEffect } from "react";

export default function ModalGiangVien({ closeModal, teacher }) {
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    khoa_chuyen_mon: "",
    ghi_chu: "",
  });

  const [departments, setDepartments] = useState([]);

  // Fetch danh sách khoa từ API
  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/department/get-all");
      const data = await res.json();
      if (res.ok) {
        setDepartments(data.data);
      } else {
        console.error("Error fetching departments:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();

    if (teacher) {
      // Nếu có teacher, điền dữ liệu vào form (chế độ update)
      setFormData({
        ten: teacher.ten || "",
        email: teacher.email || "",
        ghi_chu: teacher.ghi_chu || "",
      });
    }
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = teacher
        ? `http://localhost:5000/api/teacher/update-teacher/${teacher._id}` // Update nếu có teacher
        : "http://localhost:5000/api/teacher/sign-up"; // Thêm mới nếu không có teacher

      const method = teacher ? "PUT" : "POST"; // Update dùng PUT, thêm mới dùng POST

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        closeModal();
        setTimeout(() => {
          alert(
            teacher
              ? "Teacher updated successfully!"
              : "Teacher added successfully!"
          );
        }, 100);
      } else {
        alert(
          `Failed to ${teacher ? "update" : "add"} teacher: ${data.message}`
        );
      }
    } catch (error) {
      console.error(`Failed to ${teacher ? "update" : "add"} teacher:`, error);
      alert(`Failed to ${teacher ? "update" : "add"} teacher`);
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
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {teacher ? "Chỉnh sửa giảng viên" : "Thêm giảng viên mới"}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tên giảng viên
                  </label>
                  <input
                    type="text"
                    name="ten"
                    value={formData.ten}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
              
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ghi chú
                  </label>
                  <textarea
                    name="ghi_chu"
                    value={formData.ghi_chu}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    rows="4"
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {teacher ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
