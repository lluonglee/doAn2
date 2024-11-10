"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalPhongHoc from "./ModalPhongHoc";

export default function PhongHoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [classRooms, setClassRoom] = useState([]);
  const [selectedClassRoom, setSelectedClassRoom] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const limit = 5;

  const openModal = () => {
    setSelectedClassRoom(null);
    setIsOpen(true);
  };

  const openEditModal = (classRoom) => {
    setSelectedClassRoom(classRoom);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const fetchClassRoom = async (page = 1, query = "") => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/room/get-all?page=${page}&limit=${limit}&search=${query}`
      );
      const data = await res.json();
      if (res.ok && data.status === "OK") {
        setClassRoom(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch classRoom:", data.message);
      }
    } catch (error) {
      console.error("Error fetching classRoom:", error);
    }
  };

  const deleteClassRoom = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa Phong hoc này không?")) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/room/delete-room/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setClassRoom(classRooms.filter((classRoom) => classRoom._id !== id));
          alert("Phong hoc đã được xóa thành công!");
        } else {
          console.error("Failed to delete:", data.message);
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchClassRoom(currentPage, searchQuery);
  }, [isOpen, isDelete, currentPage, searchQuery]);

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách Phong hoc</h2>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={openModal}
          >
            Thêm mới
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm phòng học..."
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded-lg px-3 py-1 mb-3 ml-3"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Phong hoc
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {classRooms.map((classRoom) => (
              <tr
                key={classRoom._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{classRoom.room}</td>
                <td className="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => openEditModal(classRoom)}
                  >
                    Edit
                  </a>
                  <Trash2
                    className="cursor-pointer text-red-600"
                    onClick={() => {
                      setDelete(!isDelete);
                      deleteClassRoom(classRoom._id);
                    }}
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
        <ModalPhongHoc closeModal={closeModal} classRoom={selectedClassRoom} />
      )}
    </div>
  );
}
