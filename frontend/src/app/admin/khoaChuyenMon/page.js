"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalKhoaChuyenMon from "./ModalKhoaChuyenMon";
import Link from "next/link";

export default function KhoaChuyenMon() {
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState([]); // State to store departments

  // Hàm để mở modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Fetch departments from API
  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/department/get-all"
      );
      const data = await response.json();
      if (response.ok) {
        setDepartments(data.data); // Update state with fetched departments
      } else {
        console.error(data.message); // Handle error
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Use useEffect to fetch departments when modal is opened
  useEffect(() => {
    fetchDepartments(); // Fetch departments when modal opens
  }, [isOpen]); // Dependency array includes isOpen

  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-2xl">Danh sách khoa chuyên môn</h2>
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
                    <Link
                      href={`/admin/khoaChuyenMon/danhSachGiangVien/${department._id}`}
                    >
                      Danh sách Giảng viên
                    </Link>
                  </td>
                  <td className="px-6 py-4">{department.ghi_chu}</td>
                  <td className="px-6 py-4 flex gap-5 justify-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={openModal}
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
      {/** gọi modal */}
      {isOpen && <ModalKhoaChuyenMon closeModal={closeModal} />}
    </div>
  );
}
