"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalMonHoc from "./ModelMonHoc";

export default function MonHoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isDelete, setDelete] = useState(false);
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
        "http://localhost:5000/api/subject/getAll-subject"
      );
      const data = await res.json();
      if (data.status === "OK") {
        setSubjects(data.data); // Set fetched subjects
      } else {
        console.error("Failed to fetch Subjects:", data.message);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects(); // Fetch subjects when the component mounts or modal closes
  }, [isOpen, isDelete]);

  const deleteSubject = async (subjectId) => {
    if (!window.confirm("Are you sure you want to delete this subject?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/subject/delete-subject/${subjectId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Subject deleted successfully!");
        fetchSubjects(); // Refetch the subjects to update the list
      } else {
        alert("Failed to delete subject: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Error deleting subject.");
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách môn học</h2>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={openModal}
          >
            Thêm mới
          </button>
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã môn
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên môn
                </th>
                <th scope="col" className="px-6 py-3">
                  Số tín chỉ
                </th>
                <th scope="col" className="px-6 py-3">
                  Số tín chỉ lý thuyết
                </th>
                <th scope="col" className="px-6 py-3">
                  Số tín chỉ thực hành
                </th>
                <th scope="col" className="px-6 py-3">
                  Tùy chọn
                </th>
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
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => openEditModal(subject)} // Open modal for editing
                    >
                      Edit
                    </a>
                    <Trash2
                      className="cursor-pointer"
                      onClick={() => {
                        setDelete(!isDelete);
                        return deleteSubject(subject._id);
                      }} // Delete subject on click
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
