"use client";
import React, { useState, useEffect } from "react";

export default function ModalLopHocPhan({ closeModal, course }) {
  const [formData, setFormData] = useState({
    ma_lop_hoc_phan: "",
    si_so: 0,
    so_tiet_truc_tiep: 0,
    so_tiet_tong: 0,
    loai_mon_hoc: "",
    tkb: [{ thu: "", tiet: "", gio: "" }],
  });

  // Prefill the form when editing a course
  useEffect(() => {
    if (course) {
      setFormData({
        ma_lop_hoc_phan: course.ma_lop_hoc_phan || "",
        si_so: course.si_so || 0,
        so_tiet_truc_tiep: course.so_tiet_truc_tiep || 0,
        so_tiet_tong: course.so_tiet_tong || 0,
        loai_mon_hoc: course.loai_mon_hoc || "",
        tkb:
          course.tkb.length > 0 ? course.tkb : [{ thu: "", tiet: "", gio: "" }],
      });
    }
  }, [course]);

  // Handle form submission for creating or updating a course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = course
        ? `http://localhost:5000/api/course/update-course/${course._id}` // Edit course
        : "http://localhost:5000/api/course/create-course"; // Create course

      const method = course ? "PUT" : "POST";

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
            course
              ? "Course updated successfully!"
              : "Course added successfully!"
          );
        }, 100);
      } else {
        alert("Failed to save course: " + data.message);
      }
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save course.");
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
                {course ? "Sửa Lớp Học Phần" : "Thêm Lớp Học Phần Mới"}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.loai_mon_hoc}
                    onChange={handleChange}
                  >
                    <option value="">Chọn loại môn học</option>
                    <option value="Thực hành">Thực hành</option>
                    <option value="Lý thuyết">Lý thuyết</option>
                    <option value="Tích hợp">Tích hợp</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Thời khóa biểu
                  </label>
                  {formData.tkb.map((slot, index) => (
                    <div key={index} className="grid gap-2 grid-cols-3 mb-4">
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Thứ"
                        value={slot.thu}
                        onChange={(e) =>
                          handleTkbChange(index, "thu", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Tiết"
                        value={slot.tiet}
                        onChange={(e) =>
                          handleTkbChange(index, "tiet", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Giờ"
                        value={slot.gio}
                        onChange={(e) =>
                          handleTkbChange(index, "gio", e.target.value)
                        }
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => removeTkbSlot(index)}
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-500"
                    onClick={addTkbSlot}
                  >
                    + Thêm thời khóa biểu
                  </button>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-primary-700 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500"
                  onClick={closeModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {course ? "Lưu thay đổi" : "Thêm lớp học phần"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
