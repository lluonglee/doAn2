// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { Search } from "lucide-react";

// // export default function CourseSchedule() {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [selectedCourse, setSelectedCourse] = useState(null);
// //   const [courseData, setCourseData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [showSuggestions, setShowSuggestions] = useState(false);

// //   useEffect(() => {
// //     if (searchQuery.length > 0) {
// //       fetchSuggestions(searchQuery);
// //     } else {
// //       setSuggestions([]);
// //     }
// //   }, [searchQuery]);

// //   const fetchSuggestions = async (query) => {
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/course/get-all?name=${query}`
// //       );
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch suggestions");
// //       }
// //       const data = await response.json();
// //       setSuggestions(data.data);
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   const fetchCourseData = async (courseCode) => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await fetch(
// //         `http://localhost:5000/api/course/get-all?name=${courseCode}`
// //       );
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch course data");
// //       }
// //       const data = await response.json();
// //       setCourseData(data.data);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearchChange = (e) => {
// //     setSearchQuery(e.target.value);
// //     setShowSuggestions(true);
// //   };

// //   const handleSuggestionClick = (course) => {
// //     setSelectedCourse(course);
// //     setSearchQuery(course.subject.ma_mon);
// //     setShowSuggestions(false);
// //     fetchCourseData(course.subject.ma_mon);
// //   };

// //   return (
// //     <div className="h-full flex flex-col items-center p-4 bg-gray-100">
// //       {/* Header */}
// //       <div className="row">
// //         <h1 className="text-3xl font-semibold text-blue-600 mb-4">
// //           Thời khóa biểu Lớp học phần
// //         </h1>
// //         <div className="form-group col-md-6">
// //           <div className="input-group">
// //             <input
// //               id="keyword"
// //               name="keyword"
// //               type="text"
// //               className="form-control ui-autocomplete-input border border-gray-300"
// //               placeholder=" Mã môn"
// //               autoComplete="off"
// //               value={searchQuery}
// //               onChange={handleSearchChange}
// //             />
// //             <button
// //               className="btn btn-success m-4"
// //               onClick={() => fetchCourseData(selectedCourse?.subject.ma_mon)}
// //               disabled={!selectedCourse}
// //             >
// //               <Search className="inline-block" /> Tìm kiếm
// //             </button>
// //           </div>
// //           {/* Suggestions Dropdown */}
// //           {showSuggestions && (
// //             <ul className="suggestions-dropdown border border-gray-300 mt-2 w-full max-h-60 overflow-y-auto">
// //               {suggestions.map((course) => (
// //                 <li
// //                   key={course.subject.ma_mon}
// //                   className="p-2 hover:bg-gray-100 cursor-pointer"
// //                   onClick={() => handleSuggestionClick(course)}
// //                 >
// //                   {course.subject.ten_mon} - {course.subject.ma_mon}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //       </div>

// //       {/* Content Section */}
// //       {loading && <p>Đang tải...</p>}
// //       {error && <p className="text-red-500">{error}</p>}
// //       {courseData.length > 0 && (
// //         <div className="pageDetail">
// //           <h1>
// //             {courseData[0].subject.ten_mon} - {courseData[0].subject.ma_mon}
// //           </h1>

// //           {/* Schedule Table */}
// //           <div className="table w-full border-collapse border border-gray-300">
// //             <table className="table-auto w-full text-left border border-gray-400">
// //               <thead>
// //                 <tr className="bg-gray-200">
// //                   <th className="border border-gray-400 p-2">Mã</th>
// //                   <th className="border border-gray-400 p-2">Lớp học phần</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {courseData.map((schedule) => (
// //                   <tr key={schedule._id} className="hover:bg-gray-100">
// //                     <td className="border border-gray-400 p-2">
// //                       {schedule.ma_lop_hoc_phan}
// //                     </td>
// //                     <td className="border border-gray-400 p-2">
// //                       <strong>
// //                         {schedule.subject.ten_mon} - {schedule.loai_mon_hoc}
// //                       </strong>
// //                       <br />
// //                       Sĩ số: <strong>{schedule.si_so}</strong>
// //                       <br />
// //                       Số tiết: <strong>{schedule.so_tiet_truc_tiep}</strong>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";

// export default function CourseSchedule() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [courseData, setCourseData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       fetchSuggestions(searchQuery);
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchQuery]);

//   const fetchSuggestions = async (query) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/course/get-all?name=${query}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch suggestions");
//       }
//       const data = await response.json();
//       setSuggestions(data.data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const fetchCourseData = async (courseCode) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/course/get-all?name=${courseCode}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch course data");
//       }
//       const data = await response.json();
//       setCourseData(data.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setShowSuggestions(true);
//   };

//   const handleSuggestionClick = (course) => {
//     setSelectedCourse(course);
//     setSearchQuery(course.subject.ma_mon);
//     setShowSuggestions(false);
//     fetchCourseData(course.subject.ma_mon);
//   };

//   const handleSearchClick = () => {
//     if (searchQuery.trim()) {
//       fetchCourseData(searchQuery.trim());
//     }
//   };

//   return (
//     <div className="h-full flex flex-col items-center p-4 bg-gray-100">
//       {/* Header */}
//       <div className="mb-6 text-center">
//         <h1 className="text-3xl font-semibold text-blue-600 mb-4">
//           Thời khóa biểu Lớp học phần
//         </h1>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//           <input
//             id="keyword"
//             name="keyword"
//             type="text"
//             className="p-2 w-full sm:w-64 border-2 border-gray-300 rounded-lg"
//             placeholder="Nhập mã môn... "
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

//         {/* Suggestions Dropdown */}
//         {showSuggestions && suggestions.length > 0 && (
//           <ul className="absolute z-10 mt-2 bg-white w-auto max-h-48 overflow-y-auto shadow-md border-2 border-gray-300 rounded-lg">
//             {suggestions.map((course) => (
//               <li
//                 key={course.subject.ma_mon}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                 onClick={() => handleSuggestionClick(course)}
//               >
//                 {course.subject.ten_mon} - {course.subject.ma_mon}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Content Section */}
//       {loading && <p>Đang tải...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {courseData.length > 0 && (
//         <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
//           <div className="mb-4 text-center">
//             <h2 className="text-xl font-semibold text-blue-600">
//               {courseData[0]?.subject.ten_mon} - {courseData[0]?.subject.ma_mon}
//             </h2>
//           </div>

//           {/* Schedule Table */}
//           <div className="overflow-x-auto">
//             <table className="table-auto w-full text-left border-separate border-spacing-0.5">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
//                     Mã
//                   </th>
//                   <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
//                     Lớp học phần
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courseData.map((schedule) => (
//                   <tr key={schedule._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border-b border-gray-300 text-sm">
//                       {schedule.ma_lop_hoc_phan}
//                     </td>
//                     <td className="py-2 px-4 border-b border-gray-300 text-sm">
//                       <strong>
//                         {schedule.subject.ten_mon} - {schedule.loai_mon_hoc}
//                       </strong>
//                       <br />
//                       Sĩ số: <strong>{schedule.si_so}</strong>
//                       <br />
//                       Số tiết: <strong>{schedule.so_tiet_truc_tiep}</strong>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function CourseSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/course/get-all?name=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();

      // Lọc các mục trùng lặp
      const uniqueCourses = {};
      data.data.forEach((course) => {
        if (!uniqueCourses[course.subject.ma_mon]) {
          uniqueCourses[course.subject.ma_mon] = course;
        }
      });

      setSuggestions(Object.values(uniqueCourses));
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCourseData = async (courseCode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/course/get-all?name=${courseCode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch course data");
      }
      const data = await response.json();
      setCourseData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (course) => {
    setSelectedCourse(course);
    setSearchQuery(course.subject.ma_mon);
    setShowSuggestions(false);
    fetchCourseData(course.subject.ma_mon);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      fetchCourseData(searchQuery.trim());
    }
  };

  return (
    <div className="h-full flex flex-col items-center p-4 bg-gray-100">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">
          Thời khóa biểu Lớp học phần
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            id="keyword"
            name="keyword"
            type="text"
            className="p-2 w-full sm:w-64 border-2 border-gray-300 rounded-lg"
            placeholder="Nhập mã môn..."
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

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 mt-2 bg-white w-auto max-h-48 overflow-y-auto shadow-md border-2 border-gray-300 rounded-lg">
            {suggestions.map((course) => (
              <li
                key={course.subject.ma_mon}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(course)}
              >
                {course.subject.ten_mon} - {course.subject.ma_mon}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Content Section */}
      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {courseData.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-blue-600">
              {courseData[0]?.subject.ten_mon} - {courseData[0]?.subject.ma_mon}
            </h2>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-separate border-spacing-0.5">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
                    Mã
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 text-sm font-medium">
                    Lớp học phần
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseData.map((schedule) => (
                  <tr key={schedule._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-300 text-sm">
                      {schedule.ma_lop_hoc_phan}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-sm">
                      <strong>
                        {schedule.subject.ten_mon} - {schedule.loai_mon_hoc}
                      </strong>
                      <br />
                      Sĩ số: <strong>{schedule.si_so}</strong>
                      <br />
                      Số tiết: <strong>{schedule.so_tiet_truc_tiep}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
