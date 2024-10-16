"use client";
import React, { useState, useEffect } from "react";

export default function ModalNamHoc({ closeModal, semester }) {
  const [formData, setFormData] = useState({
    hoc_ky: "",
    nam_hoc: "",
  });

  useEffect(() => {
    if (semester) {
      setFormData({
        hoc_ky: semester.hoc_ky,
        nam_hoc: semester.nam_hoc,
      });
    }
  }, [semester]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        semester
          ? `http://localhost:5000/api/semester/update-semester/${semester._id}`
          : "http://localhost:5000/api/semester/create-semester",
        {
          method: semester ? "PUT" : "POST",
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
          alert(
            semester
              ? "Semester updated successfully!"
              : "Semester added successfully!"
          );
        }, 100);
      } else {
        alert("Failed to create/update semester: " + data.message);
      }
    } catch (error) {
      console.error("Failed to add/update semester:", error);
      alert("Failed to add/update semester.");
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
                {semester ? "Cập nhật năm học" : "Thêm năm học"}
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
            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="hoc_ky" className="block text-gray-700 mb-2">
                    Học kỳ
                  </label>
                  <input
                    type="text"
                    id="hoc_ky"
                    name="hoc_ky"
                    value={formData.hoc_ky}
                    onChange={handleChange}
                    required
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="nam_hoc" className="block text-gray-700 mb-2">
                    Năm học
                  </label>
                  <input
                    type="text"
                    id="nam_hoc"
                    name="nam_hoc"
                    value={formData.nam_hoc}
                    onChange={handleChange}
                    required
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
                <div className="flex items-center justify-end mt-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {semester ? "Cập nhật" : "Thêm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
