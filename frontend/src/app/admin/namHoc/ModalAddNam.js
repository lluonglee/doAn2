"use client";
import React, { useState, useEffect } from "react";

export default function ModalNam({ closeModal }) {
  const [formData, setFormData] = useState({
    semesterId: "",
    courseId: "",
    subjectId: "",
    departmentId: ""
  });

  const [semesters, setSemester] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubject] = useState([])
  const [departments, setDepartment] = useState([])
  
  useEffect(() => {
    // Gọi API để lấy danh sách giáo viên
    const fetchSemester = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/semester/get-all");
        const data = await res.json();
        setSemester(data.data);
      } catch (error) {
        console.error("Failed to fetch Semester:", error);
      }
    };
    // Gọi API để lấy danh sách khóa học
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/course/get-all"); // API courses
        const data = await res.json();
        setCourses(data.data); // Lưu danh sách khóa học vào state
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    const fetchSubject = async () =>{
      try {
        const res = await fetch("http://localhost:5000/api/subject/getAll-subject"); // API courses
        const data = await res.json();
        setSubject(data.data); // Lưu danh sách khóa học vào state
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }

    const fetchDepartment = async () =>{
      try {
        const res = await fetch("http://localhost:5000/api/department/get-all"); // API courses
        const data = await res.json();
        setDepartment(data.data); // Lưu danh sách khóa học vào state
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }


    fetchDepartment();
    fetchSubject();
    fetchSemester();
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.semesterId || !formData.courseId || !formData.subjectId) {
      alert("Vui lòng chọn Năm học, Khóa học và Môn học.");
      return;
    }
    try {
      const subjectLinkResponse = await fetch(
        "http://localhost:5000/api/assign/assign-course",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: formData.courseId,
            subjectId: formData.subjectId,
          }), // Sending Course ID and Subject ID
        }
      );
      const subjectResult = await subjectLinkResponse.json();
      if (subjectResult.status !== "OK") {
        alert("Lỗi liên kết Môn học với Khóa học: " + subjectResult.message);
        return; // Stop if there's an error
      }
  
      // Second API call to link Semester with Course
      const semesterLinkResponse = await fetch(
        "http://localhost:5000/api/assign/assign-semester",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: formData.courseId,
            semesterId: formData.semesterId,
          }), // Sending Course ID and Semester ID
        }
      );
      const semesterResult = await semesterLinkResponse.json();
      if (semesterResult.status !== "OK") {
        alert("Lỗi liên kết Năm học với Khóa học: " + semesterResult.message);
        return;
      }

      //three api

      const departmentLinkResponse = await fetch(
        "http://localhost:5000/api/assign/assign-department",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departmentId: formData.departmentId,
            courseId: formData.courseId,
          }), // Sending Course ID and Semester ID
        }
      );
      const departmentResult = await departmentLinkResponse.json();
      if (departmentResult.status !== "OK") {
        alert("Lỗi liên kết Năm học với Khóa học: " + semesterResult.message);
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
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Thêm năm học
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
  
            {/* Modal body */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                {/* Dropdown for Semester */}
                <div className="col-span-2">
                  <label
                    htmlFor="semesterId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Năm Học
                  </label>
                  <select
                    name="semesterId"
                    id="semesterId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    value={formData.semesterId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn Năm học --</option>
                    {semesters.map((semester) => (
                      <option key={semester._id} value={semester._id}>
                        {`${semester.hoc_ky} - ${semester.nam_hoc}`}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Dropdown for department */}

                <div className="col-span-2">
                  <label
                    htmlFor="departmentId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Khoa chuyên ngành
                  </label>
                  <select
                    name="departmentId"
                    id="departmentId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    value={formData.departmentId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn Khoa --</option>
                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.ten_khoa}
                      </option>
                    ))}
                  </select>
                </div>

  
                {/* Dropdown for Course */}
                <div className="col-span-2">
                  <label
                    htmlFor="courseId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lớp học phần
                  </label>
                  <select
                    name="courseId"
                    id="courseId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
  
                {/* Dropdown for Subject */}
                <div className="col-span-2">
                  <label
                    htmlFor="subjectId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Môn học
                  </label>
                  <select
                    name="subjectId"
                    id="subjectId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    value={formData.subjectId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn Môn học --</option>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.ten_mon}
                      </option>
                    ))}
                  </select>
                </div>

                
              </div>
  
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thêm mới
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
}
