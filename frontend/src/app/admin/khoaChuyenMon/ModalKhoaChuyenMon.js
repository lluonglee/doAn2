import React, { useState } from "react";

export default function ModalKhoaChuyenMon({ closeModal }) {
  const [formData, setFormData] = useState({
    ma_khoa: "",
    ten_khoa: "",
    ghi_chu: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call API to create department here
    try {
      const response = await fetch(
        "http://localhost:5000/api/department/create-department",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.status === "OK") {
        alert("Department added successfully!");
        closeModal(); // Close the modal on success
      } else {
        alert("Failed to add department: " + data.message);
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department");
    }
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
                Thêm mới Khoa
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
                    htmlFor="ma_khoa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mã Khoa
                  </label>
                  <input
                    type="text"
                    name="ma_khoa"
                    id="ma_khoa"
                    value={formData.ma_khoa}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập mã khoa"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="ten_khoa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên Khoa
                  </label>
                  <input
                    type="text"
                    name="ten_khoa"
                    id="ten_khoa"
                    value={formData.ten_khoa}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập tên khoa"
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
                    rows="4"
                    value={formData.ghi_chu}
                    onChange={handleChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Viết ghi chú ở đây"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thêm mới Khoa
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
