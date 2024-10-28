"use client";
import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import ModalCaHoc from "./ModalCaHoc";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [classTimes, setClassTimes] = useState([]);
  const [selectedClassTime, setSelectedClassTime] = useState(null);
  const [isDelete, setDelete] = useState(false);
  // Hàm để mở modal thêm mới
  const openModal = () => {
    setSelectedClassTime(null);
    setIsOpen(true);
  };

  // Hàm để mở modal chỉnh sửa
  const openEditModal = (classTime) => {
    setSelectedClassTime(classTime);
    setIsOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => setIsOpen(false);

  // Hàm để lấy danh sách ca học từ API
  const fetchClassTimes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/time/get-all");
      const data = await res.json();
      if (res.ok && data.status === "OK") {
        setClassTimes(data.data);
      } else {
        console.error("Failed to fetch class times:", data.message);
      }
    } catch (error) {
      console.error("Error fetching class times:", error);
    }
  };

  // Hàm xóa ca học
  const deleteClassTime = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa Ca Học này không?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/time/delete-time/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          fetchClassTimes(); // Cập nhật danh sách sau khi xóa thành công
        } else {
          console.error("Failed to delete class time:", data.message);
        }
      } catch (error) {
        console.error("Error deleting class time:", error);
      }
    }
  };

  useEffect(() => {
    fetchClassTimes();
  }, [isOpen, isDelete]);

  return (
    <div>
      <h2 className="text-slate-700 text-2xl">Danh sách ca học</h2>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={openModal}
        >
          Thêm mới
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Tìm kiếm
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Tên ca học</th>
              <th scope="col" className="px-6 py-3">Buổi</th>
              <th scope="col" className="px-6 py-3">Thời gian</th>
              <th scope="col" className="px-6 py-3">Ghi chú</th>
              <th scope="col" className="px-6 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {classTimes.map((classTime) => (
              <tr key={classTime._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {classTime.tenCa}
                </th>
                <td className="px-6 py-4">{classTime.buoi}</td>
                <td className="px-6 py-4">{classTime.thoiGian}</td>
                <td className="px-6 py-4">{classTime.ghi_chu}</td>
                <td className="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => openEditModal(classTime)}
                  >
                    Edit
                  </a>
                  <Trash2
                    className="cursor-pointer"
                    onClick={() =>{
                      setDelete(!isDelete);
                      return deleteClassTime(classTime._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && <ModalCaHoc closeModal={closeModal} classTime={selectedClassTime} />}
    </div>
  );
}
