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

  return (
    <div className="h-full flex flex-col items-center">
      {/* Header */}
      <div className="row">
        <h1 className="text-4xl">Thời khóa biểu giảng viên</h1>
        <div className="form-group col-md-6">
          <div className="input-group">
            <input
              id="keyword"
              name="keyword"
              type="text"
              className="form-control ui-autocomplete-input border border-[#c9d1d9]"
              placeholder=" Họ tên"
              autoComplete="off"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-success m-4"
              id="btnViewData"
              onClick={() => fetchLecturerData(selectedLecturer?.email)}
              disabled={!selectedLecturer}
            >
              <Search className="inline-block" />
              Tìm kiếm
            </button>
          </div>
          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <ul className="suggestions-dropdown border border-gray-300 mt-2 w-full max-h-60 overflow-y-auto">
              {suggestions.map((lecturer) => (
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  key={lecturer.email}
                  onClick={() => handleSuggestionClick(lecturer)}
                >
                  {lecturer.ten} - {lecturer.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Page Details */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {lecturerData && (
        <div className="pageDetail">
          <div>
            <h1>
              {lecturerData.ten} - {lecturerData.department.ten_khoa}
            </h1>
          </div>

          {/* Table */}
          <div className="table w-full border-collapse border border-gray-300">
            <table className="table-auto w-full text-left border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-2">Thứ</th>
                  <th className="border border-gray-400 p-2">Lớp học phần</th>
                </tr>
              </thead>
              <tbody>
                {lecturerData.schedules.map((schedule) =>
                  schedule.classes.map((classItem) => (
                    <tr key={classItem._id} className="hover:bg-gray-100">
                      <td className="border border-gray-400 p-2">
                        {schedule.dayOfWeek}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {classItem.ma_lop_hoc_phan.ma_lop_hoc_phan}
                        <br />
                        <strong>
                          {/** Tên môn */}
                          {classItem.ma_lop_hoc_phan.subject.ten_mon}-
                          {classItem.ma_lop_hoc_phan.loai_mon_hoc}
                        </strong>
                        <br />
                        GV: <strong>{lecturerData.ten}</strong>
                        <br />
                        Phòng: <strong>{classItem.rooms.room}</strong> (
                        {classItem.classTime.tenCa}
                        {"  "}
                        {classItem.classTime.thoiGian},{" "}
                        <strong>
                          {
                            classItem.ma_lop_hoc_phan.tkb.find(
                              (tkb) => tkb.thu === schedule.dayOfWeek
                            )?.gio
                          }
                        </strong>
                        )
                        <br />
                        {/*  'Tuần học' and 'Ngày học' */}
                        {/* Tuần học: {classItem.week} */}
                        {/* <br /> */}
                        {/* Ngày học: {classItem.date} */}
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
