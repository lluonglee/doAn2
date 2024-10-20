"use client";
import React, { useState, useEffect } from "react";

export default function ModalMonHoc({ closeModal, subject }) {
  const [formData, setFormData] = useState({
    ma_mon: "",
    ten_mon: "",
    so_tin_chi: 0,
    tin_chi_ly_thuyet: 0,
    tin_chi_thuc_hanh: 0,
  });

  // Populate form data if editing an existing subject
  useEffect(() => {
    if (subject) {
      setFormData({
        ma_mon: subject.ma_mon || "",
        ten_mon: subject.ten_mon || "",
        so_tin_chi: subject.so_tin_chi || 0,
        tin_chi_ly_thuyet: subject.tin_chi_ly_thuyet || 0,
        tin_chi_thuc_hanh: subject.tin_chi_thuc_hanh || 0,
      });
    }
  }, [subject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = subject
      ? `http://localhost:5000/api/subject/update-subject/${subject._id}` // Update if subject exists
      : "http://localhost:5000/api/subject/create-subject"; // Create new subject

    try {
      const res = await fetch(url, {
        method: subject ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        closeModal();
        alert(
          subject
            ? "Subject updated successfully!"
            : "Subject added successfully!"
        );
      } else {
        alert("Failed to save Subject: " + data.message);
      }
    } catch (error) {
      console.error("Failed to save subject:", error);
      alert("Failed to save subject.");
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
                {subject ? "Sửa Môn Học" : "Thêm Môn Học"}{" "}
                {/* Change title based on action */}
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

            {/* Modal form */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor="ma_mon"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mã môn
                  </label>
                  <input
                    type="text"
                    id="ma_mon"
                    name="ma_mon"
                    value={formData.ma_mon}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="ten_mon"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên môn
                  </label>
                  <input
                    type="text"
                    id="ten_mon"
                    name="ten_mon"
                    value={formData.ten_mon}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="so_tin_chi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Số tín chỉ
                  </label>
                  <input
                    type="number"
                    id="so_tin_chi"
                    name="so_tin_chi"
                    value={formData.so_tin_chi}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tin_chi_ly_thuyet"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tín chỉ lý thuyết
                  </label>
                  <input
                    type="number"
                    id="tin_chi_ly_thuyet"
                    name="tin_chi_ly_thuyet"
                    value={formData.tin_chi_ly_thuyet}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tin_chi_thuc_hanh"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tín chỉ thực hành
                  </label>
                  <input
                    type="number"
                    id="tin_chi_thuc_hanh"
                    name="tin_chi_thuc_hanh"
                    value={formData.tin_chi_thuc_hanh}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {subject ? "Cập nhật" : "Thêm mới"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
