"use client";
import React, { useState, useEffect } from "react";

export default function ModalLopHocPhan({ closeModal }) {
  const [formData, setFormData] = useState({
    ma_lop_hoc_phan: "",
    si_so: 0,
    so_tiet_truc_tiep: 0,
    so_tiet_tong: 0,
    loai_mon_hoc: "",
    tkb: [{ thu: "", tiet: "", gio: "" }],
  });

  const [courses, setCourses] = useState([]);

  // Fetch danh sách khoa từ API
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/department/get-all");
      const data = await res.json();
      if (res.ok) {
        setDepartments(data.data);
        console.error("Error fetching departments:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchCourses(); // Gọi hàm fetchDepartments khi modal mở
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/course/create-course",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), 
        }
      );

      const data = await res.json();
      if (data.success) {
        closeModal(); 
        setTimeout(() => {
          alert("Course added successfully!");
        }, 100); 
      } else {
        alert("Failed to create Course: " + data.message);
      }
    } catch (error) {
      console.error("Failed to add :", error);
      alert("Failed to add ");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTkbChange = (index, field, value) => {
    const updatedTkb = [...formData.tkb];
    updatedTkb[index][field] = value;
    setFormData({ ...formData, tkb: updatedTkb });
  };

  const addTkbSlot = () => {
    setFormData({
      ...formData,
      tkb: [...formData.tkb, { thu: "", tiet: "", gio: "" }],
    });
  };

  const removeTkbSlot = (index) => {
    const updatedTkb = formData.tkb.filter((_, i) => i !== index);
    setFormData({ ...formData, tkb: updatedTkb });
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
                Thêm Lớp Học Phần Mới
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
                    Mã Lớp học phần
                  </label>
                  <input
                    type="text"
                    name="ma_lop_hoc_phan"
                    id="maLopHocPhan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập mã lớp học phần"
                    required
                    value={formData.ma_lop_hoc_phan}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="siSo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sĩ số
                  </label>
                  <input
                    type="number"
                    name="si_so"
                    id="siSo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập Sĩ số"
                    required
                    value={formData.si_so}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Số tiết Trực tiếp
                  </label>
                  <input
                    type="number"
                    name="so_tiet_truc_tiep"
                    id="soTietTrucTiep"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập số tiết trực tiếp"
                    required
                    value={formData.so_tiet_truc_tiep}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Số tiết Tổng
                  </label>
                  <input
                    type="number"
                    name="so_tiet_tong"
                    id="soTietTong"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập tổng số tiết"
                    required
                    value={formData.so_tiet_tong}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="loaiMonHoc"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Loại môn học (Tùy chọn)
                  </label>
                  <select
                    name="loai_mon_hoc"
                    id="loaiMonHoc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.loai_mon_hoc}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Chọn loại môn học
                    </option>
                    <option value="Lý thuyết">Lý thuyết</option>
                    <option value="Thực hành">Thực hành</option>
                  </select>
                </div>

                {/* Add TKB fields */}
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Thời Khóa Biểu
                  </label>
                  {formData.tkb.map((slot, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                      <input
                        type="text"
                        name={`thu_${index}`}
                        placeholder="Thứ"
                        value={slot.thu}
                        onChange={(e) =>
                          handleTkbChange(index, "thu", e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                      <input
                        type="text"
                        name={`tiet_${index}`}
                        placeholder="Tiết"
                        value={slot.tiet}
                        onChange={(e) =>
                          handleTkbChange(index, "tiet", e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                      <input
                        type="text"
                        name={`gio_${index}`}
                        placeholder="Giờ"
                        value={slot.gio}
                        onChange={(e) =>
                          handleTkbChange(index, "gio", e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeTkbSlot(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTkbSlot}
                    className="text-blue-600 hover:underline"
                  >
                    + Thêm slot thời khóa biểu
                  </button>
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
