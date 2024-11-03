"use client";
import React, { useState, useEffect } from "react";

export default function ModalTKB({ closeModal }) {
  const [formData, setFormData] = useState({
    courseId: "",
    teacherId: "",
    classTimeId: "",
    scheduleId: "",
    classRoomId: "", // Added room field here
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeacher] = useState([]);
  const [classTimes, setClassTime] = useState([]);
  const [schedules, setSchedule] = useState([]);
  const [rooms, setRooms] = useState([]); // Added state for rooms
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  
  useEffect(() => {
    
   
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/course/get-all"); // API courses
        const data = await res.json();
        setCourses(data.data); // Lưu danh sách khóa học vào state
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    //
    const fetchClassTime = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/time/get-all"); 
        const data = await res.json();
        setClassTime(data.data); 
      } catch (error) {
        console.error("Failed to fetch class time:", error);
      }
    };
    //
    const fetchSchedule = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/schedule/get-all"); 
        const data = await res.json();
        setSchedule(data.data); 
      } catch (error) {
        console.error("Failed to fetch Schedule:", error);
      }
    };

    const fetchClassRoom = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/room/get-all"); 
        const data = await res.json();
        setRooms(data.data); 
      } catch (error) {
        console.error("Failed to fetch Schedule:", error);
      }
    };

   

   

    fetchClassRoom()
    fetchSchedule();
    fetchClassTime();
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!formData.courseId || !formData.classTimeId || !formData.scheduleId ) {
      alert("Vui lòng chọn Lớp học phần, Ca học, Thời gian, và Phòng học.");
      setIsSubmitting(false);
      return;
    }

    try {
      
      // const courseLinkResponse = await fetch(
      //   "http://localhost:5000/api/assign/assign-courseToSchedule",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       courseId: formData.courseId,
      //       scheduleId: formData.scheduleId,
      //     }),
      //   }
      // );
      // const courseResult = await courseLinkResponse.json();
      // if (courseResult.status !== "OK") {
      //   alert("Lỗi liên kết Khóa học: " + courseResult.message);
      //   return;
      // }

      //three api

      // const classTimeLinkResponse = await fetch(
      //   "http://localhost:5000/api/assign/assign-classTimeToSchedule",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       classTimeId: formData.classTimeId,
      //       scheduleId: formData.scheduleId,
      //     }),
      //   }
      // );
      // const  classTimeResult = await classTimeLinkResponse.json();
      // if (classTimeResult.status !== "OK") {
      //   alert("Lỗi liên kết với class time: " + classTimeResult.message);
      //   return;
      // }

      const classRoomLinkResponse = await fetch(
        "http://localhost:5000/api/assign/assign-classRoomToSchedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: formData.courseId,
            classRoomId: formData.classRoomId,
            scheduleId: formData.scheduleId,
            classTimeId: formData.classTimeId
          }),
        }
      );
      const  classRoomResult = await classRoomLinkResponse.json();
      if (classRoomResult.status !== "OK") {
        alert("Lỗi liên kết với class room: " + classRoomResult.message);
        return;
      }

      
      alert("Khóa học đã được liên kết thành công với Năm học và Môn học!");
      closeModal(); 
    } catch (error) {
      console.error("Failed to link Course, Semester, and Subject:", error);
      alert("Đã xảy ra lỗi khi liên kết Khóa học với Năm học và Môn học.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Xếp giờ các lớp học phần
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="courseId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Lớp học phần
                  </label>
                  <select
                    name="courseId"
                    id="courseId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={formData.courseId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn Lớp học phần --</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.ma_lop_hoc_phan}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="classTimeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ca học
                  </label>
                  <select
                    name="classTimeId"
                    id="classTimeId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={formData.classTimeId}
                    onChange={handleChange}
                  >
                    <option value="">-- Thời gian học --</option>
                    {classTimes.map((classTime) => (
                      <option key={classTime._id} value={classTime._id}>
                        {`${classTime.tenCa} - ${classTime.buoi}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="scheduleId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Thứ trong tuần
                  </label>
                  <select
                    name="scheduleId"
                    id="scheduleId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={formData.scheduleId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn thứ --</option>
                    {schedules.map((schedule) => (
                      <option key={schedule._id} value={schedule._id}>
                        {schedule.dayOfWeek}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="room" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phòng học
                  </label>
                  <select
                    name="classRoomId"
                    id="classRoomId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={formData.classRoomId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn phòng học --</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.room}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Xếp lịch
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
