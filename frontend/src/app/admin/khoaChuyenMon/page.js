"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalKhoaChuyenMon from "./ModalKhoaChuyenMon";
import Link from "next/link";
import ModalAddTeacher from "./ModalAddTeacher";

export default function KhoaChuyenMon() {
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // State to store selected department for editing
  const [isDelete, setDelete] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Number of items per page

  // Hàm để mở modal (for creating or updating)
  const openModal = (department = null) => {
    setSelectedDepartment(department);
    setIsOpen(true);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedDepartment(null); // Reset the selected department
  };

  const closeSecondModal = () => setIsSecondModalOpen(false);

  // Fetch departments from API
  const fetchDepartments = async (page = 1) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/department/get-all?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        setDepartments(data.data);
        setCurrentPage(data.currentPage); // Update current page from response
        setTotalPages(data.totalPages); // Update total pages from response
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Function to handle delete
  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/department/delete-department/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.status === "OK") {
        alert("Department deleted successfully");
        fetchDepartments(currentPage); // Refetch departments after deletion
      } else {
        alert("Failed to delete department: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department");
    }
  };

  useEffect(() => {
    fetchDepartments(currentPage); // Fetch departments when component mounts or modal closes
  }, [isOpen, isDelete, currentPage]);

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách khoa chuyên môn</h2>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => openModal()} // Open modal with no department selected for creating
          >
            Thêm mới
          </button>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={openSecondModal}
          >
            Thêm Giảng viên
          </button>
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên khoa chuyên môn
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã khoa
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Ghi chú
                </th>
                <th scope="col" className="px-6 py-3">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr
                  key={department._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {department.ten_khoa}
                  </th>
                  <td className="px-6 py-4">{department.ma_khoa}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/khoaChuyenMon/${department._id}`}>
                      Danh sách Giảng viên
                    </Link>
                  </td>
                  <td className="px-6 py-4">{department.ghi_chu}</td>
                  <td className="px-6 py-4 flex gap-5 justify-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => openModal(department)} // Pass department to edit
                    >
                      Edit
                    </a>
                    <Trash2
                      className="cursor-pointer  text-red-600"
                      onClick={() => {
                        setDelete(!isDelete);
                        return deleteDepartment(department._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      }

      {isOpen && (
        <ModalKhoaChuyenMon
          closeModal={closeModal}
          department={selectedDepartment}
        />
      )}
      {/* Second modal for adding to class section */}
      {isSecondModalOpen && <ModalAddTeacher closeModal={closeSecondModal} />}
    </div>
  );
}
