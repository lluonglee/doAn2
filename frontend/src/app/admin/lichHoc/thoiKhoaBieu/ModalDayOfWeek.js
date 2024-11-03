"use client";
import React, { useState, useEffect } from "react";

export default function ModalNamHoc({ closeModal, itemDayOfWeek }) {
  const [formData, setFormData] = useState({
    dayOfWeek: "",
  });

  useEffect(() => {
    if (itemDayOfWeek) {
      setFormData({
        dayOfWeek: itemDayOfWeek.dayOfWeek,
      });
    }
  }, [itemDayOfWeek]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        itemDayOfWeek
          ? `http://localhost:5000/api/schedule/update-schedule/${itemDayOfWeek._id}`
          : "http://localhost:5000/api/schedule/create-schedule",
        {
          method: itemDayOfWeek ? "PUT" : "POST",
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
            itemDayOfWeek
              ? "Cập nhật thành công!"
              : "Thêm thành công!"
          );
        }, 100);
      } else {
        alert("Thao tác thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Thao tác thất bại:", error);
      alert("Thao tác không thành công.");
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
                {itemDayOfWeek ? "Cập nhật" : "Thêm"}
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
                <span className="sr-only">Đóng modal</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="dayOfWeek" className="block text-gray-700 mb-2">
                    Thứ trong tuần
                  </label>
                  <select
                    name="dayOfWeek"
                    id="dayOfWeek"
                    value={formData.dayOfWeek}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Chọn một ngày</option>
                    <option value="Thứ 2">Thứ 2</option>
                    <option value="Thứ 3">Thứ 3</option>
                    <option value="Thứ 4">Thứ 4</option>
                    <option value="Thứ 5">Thứ 5</option>
                    <option value="Thứ 6">Thứ 6</option>
                    <option value="Thứ 7">Thứ 7</option>
                    <option value="Chủ Nhật">Chủ Nhật</option>
                  </select>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {itemDayOfWeek ? "Cập nhật" : "Thêm"}
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
