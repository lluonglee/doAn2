"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalNamHoc from "./ModalNamHoc"
import ModalAddNamHoc from "./ModalAddNam"
import Link from "next/link";

export default function MonHoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [semesters, setSemester] = useState([]); 
  const [selectedSemester, setSelectedSemester] = useState(null); 
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

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

  // Đóng modal thứ hai
  const closeSecondModal = () => setIsSecondModalOpen(false);

  const fetchSemester = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/semester/get-all");
      const data = await res.json();
      if (data.status === "OK") {
        setSemester(data.data); 
      } else {
        console.error("Failed to fetch semester:", data.message);
      }
    } catch (error) {
      console.error("Error fetching semester:", error);
    }
  };

  useEffect(() => {
    fetchSemester(); 
  }, [isOpen, isSecondModalOpen]); 

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách Hoc ky</h2>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={openModal}
          >
            Thêm mới
          </button>

          {/* Nút mở modal thứ hai */}
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            onClick={openSecondModal}
          >
           Thêm vào Lớp học phần
          </button>

         
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Hoc ky</th>
                <th scope="col" className="px-6 py-3">Nam hoc</th>
                <th scope="col" className="px-6 py-3">Xem danh sách lớp học phần</th>
                <th scope="col" className="px-6 py-3">tuy chon</th>
                
              </tr>
            </thead>
            <tbody>
              {semesters.map((semester) => (
                <tr key={semester._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{semester.hoc_ky}</td>
                  <td className="px-6 py-4">{semester.nam_hoc}</td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/namHoc/addNamHoc/${semester._id}`}
                    >
                     Danh sách lớp học phần trong học kỳ
                    </Link>
                  </td>
                  
                  <td className="px-6 py-4 flex gap-5 justify-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => openEditModal(subject)} 
                    >
                      Edit
                    </a>
                    <Trash2 className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal component */}
      {isOpen && (
        <ModalNamHoc
          closeModal={closeModal}
          semester={selectedSemester} 
        />
      )}

       {/* Modal thứ hai */}
       {isSecondModalOpen && (
        <ModalAddNamHoc
          closeModal={closeSecondModal}
        />
      )}
    </div>
  );
}
