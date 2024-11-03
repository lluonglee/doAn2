"use client";
import React, { useState, useEffect } from "react";

export default function ModalCaHoc({ closeModal, classTime }) {
  const [formData, setFormData] = useState({
    tenCa: "",
    buoi: "",
    thoiGian: "",
    ghi_chu: "",
  });

  const [classTimes, setClassTimes] = useState([]);

  const fetchClassTimes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/time/get-all");
      const data = await response.json();
      setClassTimes(data.data);
    } catch (error) {
      console.error("Failed to fetch class times:", error);
    }
  };

  useEffect(() => {
    fetchClassTimes();

    if (classTime) {
      setFormData({
        tenCa: classTime.tenCa,
        buoi: classTime.buoi,
        thoiGian: classTime.thoiGian,
        ghi_chu: classTime.ghi_chu,
      });
    }
  }, [classTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = classTime
      ? `http://localhost:5000/api/time/update-time/${classTime._id}`
      : "http://localhost:5000/api/time/create-classTime";

    const method = classTime ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(classTime ? "Class time updated successfully!" : "Class time added successfully!");
        closeModal();
        fetchClassTimes();
      } else {
        alert("Failed to save class time");
      }
    } catch (error) {
      console.error("Failed to save class time:", error);
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
                {classTime ? "Update Class Time" : "Add New Class Time"}
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

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="tenCa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên Ca
                  </label>
                  <input
                    type="text"
                    name="tenCa"
                    id="tenCa"
                    value={formData.tenCa}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập tên ca học"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="buoi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Buổi
                  </label>
                  <select
                    name="buoi"
                    id="buoi"
                    value={formData.buoi}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Chọn buổi</option>
                    <option value="Sáng">Sáng</option>
                    <option value="Chiều">Chiều</option>
                    <option value="Tối">Tối</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="thoiGian"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Thời Gian
                  </label>
                  <input
                    type="text"
                    name="thoiGian"
                    id="thoiGian"
                    value={formData.thoiGian}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="08:00 - 10:00"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="ghi_chu"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ghi Chú
                  </label>
                  <textarea
                    name="ghi_chu"
                    id="ghi_chu"
                    value={formData.ghi_chu}
                    onChange={handleChange}
                    rows="2"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ghi chú nếu có"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {classTime ? "Update Class Time" : "Add Class Time"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
