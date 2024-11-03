"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import ModalTKB from "./ModalTKB";
import Link from "next/link";
import DayOfWeek from "./ModalDayOfWeek";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const openSecondModal = () => setIsSecondModalOpen(true);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeSecondModal = () => setIsSecondModalOpen(false);

  const fetchSchedules = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/schedule/get-all");
      const data = await res.json();
      if (res.ok && data.status === "OK") {
        setSchedules(data.data);
      } else {
        console.error("Failed to fetch schedule:", data.message);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  },[isOpen, isSecondModalOpen]); 

  return (
    <div>
      <h1>Thời Khóa Biểu</h1>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={openModal}
        >
          Xếp giờ vào các lớp học phần
        </button>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={openSecondModal}
        >
          Thêm thứ trong tuần
        </button>

        <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Thứ - Ngày học</th>
                <th scope="col" className="px-6 py-3">Tùy Chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{schedule.dayOfWeek}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/lichHoc/thoiKhoaBieu/${schedule._id}`}>
                      Xem lịch
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && <ModalTKB closeModal={closeModal} />}
      {isSecondModalOpen && <DayOfWeek closeModal={closeSecondModal} />}
    </div>
  );
}
