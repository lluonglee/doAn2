// "use client";

// import React, { useState } from "react";
// import { Search } from "lucide-react";

// export default function DepartmentSchedule() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [departmentData, setDepartmentData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   // Hàm gọi API để lấy danh sách khoa dựa trên mã khoa
//   const fetchDepartmentSuggestions = async (ma_khoa) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/department/get-all?ma_khoa=${ma_khoa}`
//       );
//       if (!response.ok) {
//         throw new Error("Không thể lấy dữ liệu khoa");
//       }
//       const data = await response.json();
//       setSuggestions(data.data); // Giả sử API trả về danh sách khoa trong data.data
//       setShowSuggestions(true); // Hiển thị danh sách gợi ý
//       console.log(suggestions);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Hàm gọi API để lấy dữ liệu thời khóa biểu của khoa
//   const fetchDepartmentData = async (ma_khoa) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/teacher/get-all?ma_khoa=${ma_khoa}`
//       );
//       if (!response.ok) {
//         throw new Error("Không thể lấy dữ liệu thời khóa biểu");
//       }
//       const data = await response.json();
//       setDepartmentData(data.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Hàm xử lý thay đổi trong ô tìm kiếm
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     if (value.length > 0) {
//       fetchDepartmentSuggestions(value);
//       //setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   // Hàm xử lý khi người dùng chọn một khoa từ danh sách gợi ý
//   const handleSuggestionClick = (department) => {
//     setSearchQuery(department.ma_khoa);
//     setShowSuggestions(false);
//     fetchDepartmentData(department.ma_khoa); // Lấy dữ liệu thời khóa biểu của khoa đã chọn
//   };

//   const handleSearchClick = () => {
//     if (searchQuery.trim()) {
//       fetchDepartmentData(searchQuery.trim());
//     }
//   };

//   return (
//     <div className="h-full flex flex-col items-center p-4 bg-gray-100">
//       {/* Header */}
//       <div className="mb-6 text-center">
//         <h1 className="text-3xl font-semibold text-blue-600 mb-4">
//           Thời khóa biểu Khoa
//         </h1>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//           <input
//             id="keyword"
//             name="keyword"
//             type="text"
//             className="p-2 w-full sm:w-64 border-2 border-gray-300 rounded-lg"
//             placeholder="Nhập Mã khoa... VD:CNTT"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             autoComplete="off"
//           />
//           <button
//             className="btn bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
//             id="btnViewData"
//             onClick={handleSearchClick}
//             disabled={!searchQuery.trim()}
//           >
//             <Search className="inline-block mr-2" />
//             Tìm kiếm
//           </button>
//         </div>

//         {/* Danh sách gợi ý */}
//         {showSuggestions && suggestions.length > 0 && (
//           <ul className="absolute z-10 mt-2 bg-white w-auto max-h-48 overflow-y-auto shadow-md border-2 border-gray-300 rounded-lg">
//             {suggestions.map((department) => (
//               <li
//                 key={department.ma_khoa}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                 onClick={() => handleSuggestionClick(department)}
//               >
//                 {department.ma_khoa} - {department.ten_khoa}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Page Details */}
//       {loading && (
//         <div className="text-center">
//           <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
//         </div>
//       )}
//       {error && (
//         <div className="text-center">
//           <p className="text-lg text-red-600">{error}</p>
//         </div>
//       )}
//       {departmentData && (
//         <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-blue-600">
//               {departmentData[0]?.department?.ten_khoa || "Tên Khoa"}
//             </h2>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="table-auto w-full text-left border-separate border-spacing-0.5">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
//                     Thứ
//                   </th>
//                   <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
//                     Lớp học phần
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {departmentData.map((lecturer) =>
//                   lecturer.schedules.map((schedule) =>
//                     schedule.classes.map((classItem) => (
//                       <tr key={classItem._id} className="hover:bg-gray-50">
//                         <td className="py-2 px-4 border-b border-gray-300 text-sm">
//                           {schedule.dayOfWeek}
//                         </td>
//                         <td className="py-2 px-4 border-b border-gray-300 text-sm">
//                           {classItem.ma_lop_hoc_phan.ma_lop_hoc_phan}
//                           <br />
//                           <strong>
//                             {classItem.ma_lop_hoc_phan.subject.ten_mon} -{" "}
//                             {classItem.ma_lop_hoc_phan.loai_mon_hoc}
//                           </strong>
//                           <br />
//                           <span className="font-semibold">GV:</span>{" "}
//                           {classItem.giang_vien_phu_trach != undefined
//                             ? classItem.giang_vien_phu_trach.ten
//                             : "Chưa phân công"}
//                           <br />
//                           <span className="font-semibold">Phòng:</span>{" "}
//                           {classItem.rooms.room}
//                           <br />
//                           <span className="font-semibold">Thời gian:</span>{" "}
//                           {classItem.classTime.tenCa}{" "}
//                           {classItem.classTime.thoiGian}
//                         </td>
//                       </tr>
//                     ))
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function DepartmentSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentData, setDepartmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Hàm gọi API để lấy danh sách khoa dựa trên mã khoa
  const fetchDepartmentSuggestions = async (ma_khoa) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/department/get-all?ma_khoa=${ma_khoa}`
      );
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu khoa");
      }
      const data = await response.json();
      setSuggestions(data.data); // Giả sử API trả về danh sách khoa trong data.data
      setShowSuggestions(true); // Hiển thị danh sách gợi ý
      console.log(suggestions);
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm gọi API để lấy dữ liệu thời khóa biểu của khoa
  const fetchDepartmentData = async (ma_khoa) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/teacher/get-all?ma_khoa=${ma_khoa}`
      );
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu thời khóa biểu");
      }
      const data = await response.json();
      setDepartmentData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi trong ô tìm kiếm
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 0) {
      fetchDepartmentSuggestions(value);
      //setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Hàm xử lý khi người dùng chọn một khoa từ danh sách gợi ý
  const handleSuggestionClick = (department) => {
    setSearchQuery(department.ma_khoa);
    setShowSuggestions(false);
    fetchDepartmentData(department.ma_khoa); // Lấy dữ liệu thời khóa biểu của khoa đã chọn
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      fetchDepartmentData(searchQuery.trim());
    }
  };

  return (
    <div className="h-full flex flex-col items-center p-4 bg-gray-100">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">
          Thời khóa biểu Khoa
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            id="keyword"
            name="keyword"
            type="text"
            className="p-2 w-full sm:w-64 border-2 border-gray-300 rounded-lg"
            placeholder="Nhập Mã khoa... VD:CNTT"
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          <button
            className="btn bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            id="btnViewData"
            onClick={handleSearchClick}
            disabled={!searchQuery.trim()}
          >
            <Search className="inline-block mr-2" />
            Tìm kiếm
          </button>
        </div>

        {/* Danh sách gợi ý */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 mt-2 bg-white w-auto max-h-48 overflow-y-auto shadow-md border-2 border-gray-300 rounded-lg">
            {suggestions.map((department) => (
              <li
                key={department.ma_khoa}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(department)}
              >
                {department.ma_khoa} - {department.ten_khoa}
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
      {departmentData && (
        <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-blue-600">
              {departmentData[0]?.department?.ten_khoa || "Tên Khoa"}
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
                {departmentData.map((lecturer) =>
                  lecturer.schedules.map((schedule) =>
                    schedule.classes
                      .filter(
                        (classItem) =>
                          classItem.giang_vien_phu_trach != undefined
                      )
                      .map((classItem) => (
                        <tr key={classItem._id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b border-gray-300 text-sm">
                            {schedule.dayOfWeek}
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
                            {classItem.giang_vien_phu_trach.ten}
                            <br />
                            <span className="font-semibold">Phòng:</span>{" "}
                            {classItem.rooms.room}
                            <br />
                            <span className="font-semibold">
                              Thời gian:
                            </span>{" "}
                            {classItem.classTime.tenCa}{" "}
                            {classItem.classTime.thoiGian}
                          </td>
                        </tr>
                      ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
