"use client";
import React, { useState, useEffect } from "react";

export default function ModalAddTeacher({ closeModal }) {
  const [formData, setFormData] = useState({
    departmentId: "",
    teacherId: ""
  });

  const [departments, setDepartment] = useState([])
  const [teachers, setTeacher] = useState([])
  
  useEffect(() => {
    
    const fetchDepartment = async () =>{
      try {
        const res = await fetch("http://localhost:5000/api/department/get-all"); // API courses
        const data = await res.json();
        setDepartment(data.data); // Lưu danh sách khóa học vào state
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }

      
    }

    const fetchTeacher = async () =>{
        try {
          const res = await fetch("http://localhost:5000/api/teacher/get-all"); 
          const data = await res.json();
          setTeacher(data.data); 
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
  
        
      }

    


    fetchDepartment();
    fetchTeacher();
   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.departmentId || !formData.teacherId ) {
      alert("Vui lòng chọn đầy đủ.");
      return;
    }
    try {
      const departmentLinkResponse = await fetch(
        "http://localhost:5000/api/assign/assign-departmentToTeacher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departmentId: formData.departmentId,
            teacherId: formData.teacherId,
          }),
        }
      );
      const departmentResult = await departmentLinkResponse.json();
      if (departmentResult.status !== "OK") {
        alert("Lỗi liên kết Môn học với Khóa học: " + subjectResult.message);
        return; // Stop if there's an error
      }
  
      

      
      alert("đã được liên kết thành công!!!");
      closeModal(); 
    } catch (error) {
      console.error("Failed to link Teacher or Department:", error);
      alert("Đã xảy ra lỗi !!!.");
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
                        {`${department.ma_khoa} - ${department.ten_khoa}`}
                      </option>
                    ))}
                  </select>
                </div>
  
                {/* Dropdown for teacher */}
                <div className="col-span-2">
                  <label
                    htmlFor="teacherId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Giảng viên
                  </label>
                  <select
                    name="teacherId"
                    id="teacherId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    value={formData.teacherId}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn Giảng viên --</option>
                    {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.ten}
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
