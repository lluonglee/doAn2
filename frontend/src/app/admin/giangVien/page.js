"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalGiangVien from "./ModalGiangVien";

export default function GiangVien() {
  const [isOpen, setIsOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [excelFile, setExcelFile] = useState(null); // State lưu file Excel

  const openModal = () => {
    setSelectedTeacher(null);
    setIsOpen(true);
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // Hàm fetch danh sách giảng viên từ backend
  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teacher/get-all");
      const data = await res.json();
      if (res.ok && data.status === "OK") {
        setTeachers(data.data);
      } else {
        console.error("Failed to fetch teachers:", data.message);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Hàm xóa giảng viên
  const deleteTeacher = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa giảng viên này không?")) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/teacher/delete-teacher/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setTeachers(teachers.filter((teacher) => teacher._id !== id)); // Cập nhật lại danh sách sau khi xóa
          alert("Giảng viên đã được xóa thành công!");
        } else {
          console.error("Failed to delete teacher:", data.message);
        }
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  // Hàm upload file Excel
  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert("Vui lòng chọn một file Excel");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const res = await fetch("http://localhost:5000/api/excel/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.status === "OK") {
        alert("File Excel đã được import thành công!");
        fetchTeachers(); // Cập nhật lại danh sách giảng viên sau khi import
      } else {
        alert("Import file thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Error importing Excel file:", error);
    }
  };

  useEffect(() => {
    fetchTeachers(); 
  }, [isOpen, isDelete]); 

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách giảng viên</h2>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={openModal}
          >
            Thêm mới
          </button>
          <input
            
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setExcelFile(e.target.files[0])}
            className="mt-2 mb-2 px-3"
          />
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            onClick={handleExcelUpload}
          >
            Import Excel
          </button>
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên giảng viên
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Khoa chuyên môn
                </th>
                <th scope="col" className="px-6 py-3">
                  Ghi chú
                </th>
                <th scope="col" className="px-6 py-3">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {teacher.ten}
                  </th>
                  <td className="px-6 py-4">{teacher.email}</td>
                  <td className="px-6 py-4">
                    {teacher.department?.ten_khoa || "Không có khoa"}
                  </td>
                  <td className="px-6 py-4">{teacher.ghi_chu}</td>
                  <td className="px-6 py-4 flex gap-5 justify-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => openEditModal(teacher)}
                    >
                      Edit
                    </a>
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => {
                        setDelete(!isDelete);
                        return deleteTeacher(teacher._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <ModalGiangVien closeModal={closeModal} teacher={selectedTeacher} />
      )}
    </div>
  );
}
