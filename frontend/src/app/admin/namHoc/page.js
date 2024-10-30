"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalNamHoc from "./ModalNamHoc";
import ModalAddNamHoc from "./ModalAddNam";
import Link from "next/link";

export default function MonHoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [semesters, setSemester] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const openModal = () => {
    setSelectedSemester(null);
    setIsOpen(true);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const openEditModal = (semester) => {
    setSelectedSemester(semester);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const closeSecondModal = () => setIsSecondModalOpen(false);

  const fetchSemester = async (page = 1) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/semester/get-all?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data.status === "OK") {
        setSemester(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        console.log(data);
      } else {
        console.error("Failed to fetch semester:", data.message);
      }
    } catch (error) {
      console.error("Error fetching semester:", error);
    }
  };

  const deleteSemester = async (semesterId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/semester/delete-semester/${semesterId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Semester deleted successfully!");
        fetchSemester(currentPage); // Refresh semester list on current page
      } else {
        alert("Failed to delete semester: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting semester:", error);
      alert("Failed to delete semester.");
    }
  };

  useEffect(() => {
    fetchSemester(currentPage);
  }, [isOpen, isSecondModalOpen, currentPage]);

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách Học kỳ</h2>
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
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            onClick={openSecondModal}
          >
            Thêm vào Lớp học phần
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Học kỳ
              </th>
              <th scope="col" className="px-6 py-3">
                Năm học
              </th>
              <th scope="col" className="px-6 py-3">
                Xem danh sách lớp học phần
              </th>
              <th scope="col" className="px-6 py-3">
                Tùy chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester) => (
              <tr
                key={semester._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{semester.hoc_ky}</td>
                <td className="px-6 py-4">{semester.nam_hoc}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/namHoc/${semester._id}`}>
                    Danh sách lớp học phần
                  </Link>
                </td>
                <td className="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => openEditModal(semester)}
                  >
                    Edit
                  </a>
                  <Trash2
                    className="cursor-pointer  text-red-600"
                    onClick={() => deleteSemester(semester._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {isOpen && (
        <ModalNamHoc closeModal={closeModal} semester={selectedSemester} />
      )}
      {isSecondModalOpen && <ModalAddNamHoc closeModal={closeSecondModal} />}
    </div>
  );
}
