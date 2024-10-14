"use client";
import React, { useState, useEffect } from "react";

export default function ModalMonHoc({ closeModal }) {
  const [formData, setFormData] = useState({
    ma_mon: "",
    ten_mon: "",
    so_tin_chi: 0,
    tin_chi_ly_thuyet: 0,
    tin_chi_thuc_hanh: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:5000/api/subject/create-subject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await res.json();
      console.log(data); // Log the full response for debugging
      if (data.success) {
        closeModal();
        setTimeout(() => {
          alert("Subject added successfully!");
        }, 100);
      } else {
        alert("Failed to create Subject: " + data.message);
      }
    } catch (error) {
      console.error("Failed to add subject:", error);
      alert("Failed to add subject.");
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
                Thêm Môn Học
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
                <div className="col-span-2">
                  <label
                    htmlFor="maLopHocPhan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mã môn
                  </label>
                  <input
                    type="text"
                    name="ma_mon"
                    id="maMon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập Mã môn học"
                    required
                    value={formData.ma_mon}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="siSo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên Môn học
                  </label>
                  <input
                    type="text"
                    name="ten_mon"
                    id="tenMon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập tên môn"
                    required
                    value={formData.ten_mon}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Số tín chỉ
                  </label>
                  <input
                    type="number"
                    name="so_tin_chi"
                    id="soTietTrucTiep"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập số tín chỉ"
                    required
                    value={formData.so_tin_chi}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tín chỉ lý thuyết
                  </label>
                  <input
                    type="number"
                    name="tin_chi_ly_thuyet"
                    id="tinChiLyThuyet"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập số tín chỉ lý thuyết"
                    required
                    value={formData.tin_chi_ly_thuyet}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tín chỉ Thực hành
                  </label>
                  <input
                    type="number"
                    name="tin_chi_thuc_hanh"
                    id="tinChiThucHanh"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập số tín chỉ thực hành"
                    required
                    value={formData.tin_chi_thuc_hanh}
                    onChange={handleChange}
                  />
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
