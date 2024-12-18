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
  const [loading, setLoading] = useState(false);
  const openSecondModal = () => setIsSecondModalOpen(true);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeSecondModal = () => setIsSecondModalOpen(false);
  const [message, setMessage] = useState("");

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
    // button cào
  // Handle data crawling
  const handleCrawl = async () => {
    const selectElement = document.getElementById("hocky");
    const selectedSemester = selectElement.selectedOptions[0].text;
    console.log(selectedSemester);
    if (!selectedSemester) {
      alert("Vui lòng chọn học kỳ trước khi cào dữ liệu!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/crawl/crawler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          khoaName: "Khoa Công nghệ thông tin",
          hocKyName: selectedSemester,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        alert("Cào dữ liệu thành công!");
        //fetchSchedule(id); // Refresh the schedule to include new data
        console.log(data.data);
      } else {
        alert("Cào dữ liệu thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Error during data crawling:", error);
      alert("Có lỗi xảy ra khi cào dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  },[isOpen, isSecondModalOpen]); 

  return (
    <div>
      <h1>Thời Khóa Biểu</h1>
      <div className="flex flex-row crawler">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleCrawl} // Gắn hàm handleCrawl
              disabled={loading} // Disable button khi đang tải
            >
              {loading ? "Đang cào dữ liệu..." : "Cào dữ liệu"}
            </button>

            <div class="form-group col-md-4">
              <select class="form-control" id="hocky" name="hocky">
                <option value="42">Học kỳ 1, 2024-2025</option>
                <option value="43">Học kỳ 2, 2024-2025</option>
                <option value="41">Học kỳ hè, 2023-2024</option>
                <option value="40">Học kỳ 2, 2023-2024</option>
                <option value="39">Học kỳ phụ, 2023-2024</option>
                <option value="37">Học kỳ 1, 2023-2024</option>
                <option value="36">Học kỳ hè, 2022-2023</option>
              </select>
            </div>
          </div>
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
