"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalMonHoc from "./ModelMonHoc";

export default function MonHoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // Adjust as needed

  const openModal = () => {
    setSelectedSubject(null); // Reset selected subject when adding a new subject
    setIsOpen(true); // Open modal for adding
  };

  const openEditModal = (subject) => {
    setSelectedSubject(subject); // Set the selected subject to be edited
    setIsOpen(true); // Open modal for editing
  };

  const closeModal = () => setIsOpen(false);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/subject/getAll-subject?page=${currentPage}&limit=${pageSize}`
      );
      const data = await res.json();
      if (data.status === "OK") {
        setSubjects(data.data); // Update to match your actual data structure
        setTotalPages(data.pagination.totalPages); // Ensure pagination.totalPages is correct
      } else {
        console.error("Failed to fetch subjects:", data.message);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects(); // Fetch subjects when the component mounts or page changes
    console.log(currentPage);
  }, [isOpen, currentPage]);

  const deleteSubject = async (subjectId) => {
    if (!window.confirm("Are you sure you want to delete this subject?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/subject/delete-subject/${subjectId}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (data.success) {
        alert("Subject deleted successfully!");
        fetchSubjects(currentPage); // Refetch the subjects to update the list
      } else {
        alert("Failed to delete subject: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Error deleting subject.");
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchSubjects();
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchSubjects();
    }
  };

  return (
    <div>
      <h2 className="text-slate-700 text-2xl">Danh sách môn học</h2>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          onClick={openModal}
        >
          Thêm mới
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Mã môn</th>
              <th className="px-6 py-3">Tên môn</th>
              <th className="px-6 py-3">Số tín chỉ</th>
              <th className="px-6 py-3">Số tín chỉ lý thuyết</th>
              <th className="px-6 py-3">Số tín chỉ thực hành</th>
              <th className="px-6 py-3">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr
                key={subject._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{subject.ma_mon}</td>
                <td className="px-6 py-4">{subject.ten_mon}</td>
                <td className="px-6 py-4">{subject.so_tin_chi}</td>
                <td className="px-6 py-4">{subject.tin_chi_ly_thuyet}</td>
                <td className="px-6 py-4">{subject.tin_chi_thuc_hanh}</td>
                <td className="px-6 py-4 flex gap-5 justify-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openEditModal(subject)}
                  >
                    Edit
                  </button>
                  <Trash2
                    className="cursor-pointer text-red-600"
                    onClick={() => deleteSubject(subject._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal component */}
      {isOpen && (
        <ModalMonHoc
          closeModal={closeModal}
          subject={selectedSubject} // Pass selected subject for editing
        />
      )}
    </div>
  );
}
