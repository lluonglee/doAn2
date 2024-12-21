"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function LecturerSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [lecturerData, setLecturerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions as the user types
  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Fetch lecturer data if email is stored in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      fetchLecturerData(storedEmail);
    }
  }, []);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/teacher/get-all?name=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      setSuggestions(data.data); // Assuming the API returns an array of lecturers in data.data
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true); // Show suggestions when user types
  };

  const handleSuggestionClick = (lecturer) => {
    setSelectedLecturer(lecturer);
    setSearchQuery(`${lecturer.ten} - ${lecturer.email}`);
    setShowSuggestions(false); // Hide suggestions after selection
    fetchLecturerData(lecturer.email); // Fetch the schedule based on the selected lecturer's email
  };

  const fetchLecturerData = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:5000/api/teacher/get-all?email=${email}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch lecturer data");
      }
      const data = await res.json();
      setLecturerData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter schedules to include only those that have a lecturer assigned
  const filteredSchedules = lecturerData?.schedules
    ?.map((schedule) => ({
      ...schedule,
      classes: schedule.classes.filter(
        (classItem) => classItem.giang_vien_phu_trach
      ), // Filter out classes without a lecturer assigned
    }))
    .filter((schedule) => schedule.classes.length > 0); // Only include schedules with at least one class

  return (
    <div className="h-full flex flex-col items-center p-4 bg-gray-100">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">
          Thời khóa biểu giảng viên
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            id="keyword"
            name="keyword"
            type="text"
            className="p-2 w-full sm:w-64 border-2 border-gray-300 rounded-lg"
            placeholder="Nhập tên giảng viên..."
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          <button
            className="btn bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            id="btnViewData"
            onClick={() => fetchLecturerData(selectedLecturer?.email)}
            disabled={!selectedLecturer}
          >
            <Search className="inline-block mr-2" />
            Tìm kiếm
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-dropdown absolute z-10 mt-2 bg-white w-auto max-h-48 overflow-y-auto shadow-md border-2 border-gray-300 rounded-lg">
            {suggestions.map((lecturer) => (
              <li
                key={lecturer.email}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(lecturer)}
              >
                {lecturer.ten} - {lecturer.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Page Details */}
      {loading && (
        <div className="text-center">
          <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
        </div>
      )}
      {error && (
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      )}
      {lecturerData && (
        <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-blue-600">
              {lecturerData.ten} - {lecturerData.department.ten_khoa}
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-separate border-spacing-0.5">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
                    Thứ
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
                    Lớp học phần
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules?.map((schedule) =>
                  schedule.classes.map((classItem) => (
                    <tr key={classItem._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-300 text-sm">
                        {schedule.dayOfWeek} {/* Hiển thị Thứ */}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm">
                        {classItem.ma_lop_hoc_phan.ma_lop_hoc_phan}
                        <br />
                        <strong>
                          {classItem.ma_lop_hoc_phan.subject.ten_mon} -{" "}
                          {classItem.ma_lop_hoc_phan.loai_mon_hoc}
                        </strong>
                        <br />
                        <span className="font-semibold">GV:</span>{" "}
                        {lecturerData.ten}
                        <br />
                        <span className="font-semibold">Phòng:</span>{" "}
                        {classItem.rooms.room}
                        <br />
                        <span className="font-semibold">Thời gian:</span>{" "}
                        {classItem.classTime.tenCa}{" "}
                        {classItem.classTime.thoiGian}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
