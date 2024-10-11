"use client";
import React, { useState } from "react";

export default function ModalTKB({ closeModal }) {
  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [teacher, setTeacher] = useState("");
  const [day, setDay] = useState("");
  const [lessonType, setLessonType] = useState("Lý thuyết");
  const [lessonCount, setLessonCount] = useState(1);
  const [timeOptions, setTimeOptions] = useState([]);
  const [startTime, setStartTime] = useState("");

  const subjects = {
    TH1000: "Lập trình căn bản",
    TH2000: "Cấu trúc dữ liệu",
    // Add more subjects here
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setSubjectCode(
      Object.keys(subjects).find((key) => subjects[key] === e.target.value)
    );
  };

  const handleLessonTypeChange = (e) => {
    setLessonType(e.target.value);
    setLessonCount(1);
    setStartTime("");
  };

  const handleLessonCountChange = (e) => {
    const count = parseInt(e.target.value);
    setLessonCount(count);
    updateTimeOptions(lessonType, count);
  };

  const updateTimeOptions = (type, count) => {
    let options = [];
    if (type === "Lý thuyết") {
      if (count === 1) {
        options = ["7:00", "7:40", "8:20", "9:00", "9:30"];
      } else if (count === 2) {
        options = ["7:00-8:20", "7:40-9:20", "8:20-10:00"];
      }
    } else {
      if (count === 1) {
        options = ["6:30", "8:40", "12:30", "15:20"];
      } else if (count === 2) {
        options = ["6:30-9:00", "12:30-15:00"];
      }
    }
    setTimeOptions(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sắp xếp thời khóa biểu
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tên môn học (optional)
            </label>
            <select
              value={subject}
              onChange={handleSubjectChange}
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Chọn môn học</option>
              {Object.values(subjects).map((subj, index) => (
                <option key={index} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mã môn học
            </label>
            <input
              type="text"
              value={subjectCode}
              readOnly
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Giảng viên (optional)
            </label>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Chọn thứ (optional)
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Chọn thứ</option>
              <option value="2">Thứ 2</option>
              <option value="3">Thứ 3</option>
              <option value="4">Thứ 4</option>
              <option value="5">Thứ 5</option>
              <option value="6">Thứ 6</option>
              <option value="7">Thứ 7</option>
              <option value="CN">Chủ Nhật</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Loại tiết
            </label>
            <select
              value={lessonType}
              onChange={handleLessonTypeChange}
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="Lý thuyết">Lý thuyết</option>
              <option value="Thực hành">Thực hành</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Số tiết
            </label>
            <input
              type="number"
              value={lessonCount}
              min={lessonType === "Lý thuyết" ? 1 : 1}
              max={lessonType === "Lý thuyết" ? 13 : 5}
              onChange={handleLessonCountChange}
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Giờ học
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Chọn giờ học</option>
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Lưu
          </button>
        </form>
        <button
          onClick={closeModal}
          className="w-full mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
