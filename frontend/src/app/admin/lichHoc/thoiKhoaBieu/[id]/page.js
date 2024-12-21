// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function GetDetailDepartment() {
//   const { id } = useParams();
//   const [scheduleDetail, setScheduleDetail] = useState(null);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedClassId, setSelectedClassId] = useState(null); // For modal
//   const [selectedTeacherId, setSelectedTeacherId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch schedule details and teachers list
//   useEffect(() => {
//     if (id) fetchSchedule(id);
//     fetchTeachers(); // Fetch the teacher list on component load
//   }, [id]);

//   // Fetch schedule details
//   const fetchSchedule = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/schedule/detail-schedule/${id}`);
//       const data = await res.json();
//       if (data.status === "OK") setScheduleDetail(data.data);
//       else console.error("Failed to fetch schedule details");
//     } catch (error) {
//       console.error("Error fetching schedule details", error);
//     }
//   };

//   // Fetch all teachers
//   const fetchTeachers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/teacher/get-all");
//       const data = await res.json();
//       setTeachers(data.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   // Open the modal for assigning teacher
//   const openAssignModal = (classId) => {
//     setSelectedClassId(classId); // Store selected class ID for modal
//     setMessage(""); // Reset message when modal opens
//   };

//   // Handle teacher assignment
//   const handleAssignTeacher = async () => {
//     if (!selectedTeacherId) {
//       setMessage("Vui lòng chọn giảng viên.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/assign/assign-teacher", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           scheduleId: scheduleDetail._id, // Pass scheduleId here
//           classId: selectedClassId, // Pass selectedClassId
//           teacherId: selectedTeacherId, // Pass selectedTeacherId
//         }),
//       });

//       const result = await res.json();
//       if (result.status === "OK") {
//         setMessage("Phân công thành công!");
//         fetchSchedule(id); // Refresh data
//         setSelectedTeacherId(""); // Reset selection
//         setTimeout(() => setSelectedClassId(null), 1000); // Close modal after 1s
//       } else {
//         setMessage("Phân công thất bại: " + result.message);
//       }
//     } catch (error) {
//       console.error("Assignment error:", error);
//       setMessage("Có lỗi xảy ra khi phân công giảng viên.");
//     } finally {
//       setLoading(false); // Finish loading
//     }
//   };


  

//   return (
//     <div>
//       <h2 className="text-slate-700 text-2xl">Danh Sách Lịch Giảng Dạy</h2>

//       {scheduleDetail ? (
//         <div>
//           <p className="py-2">
//             <strong>Thứ trong tuần:</strong> {scheduleDetail.dayOfWeek}
//           </p>

//           {/* Table for classes */}
//           <div className="relative overflow-x-auto shadow-md">
//             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                 <tr>
//                   <th>Mã học phần</th>
//                   <th>Sĩ số</th>
//                   <th>Lý thuyết/Thực hành</th>
//                   <th>Ca học</th>
//                   <th>Phòng học</th>
//                   <th>Giảng viên phụ trách</th>
//                   <th>Phân công giảng viên</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {scheduleDetail.classes.map((classItem) => (
//                   <tr key={classItem._id}>
//                     <td>{classItem.ma_lop_hoc_phan?.ma_lop_hoc_phan}</td>
//                     <td>{classItem.ma_lop_hoc_phan?.si_so}</td>
//                     <td>{classItem.ma_lop_hoc_phan?.loai_mon_hoc}</td>
//                     <td>{classItem.classTime?.tenCa}</td>
//                     <td>{classItem.rooms?.room || "không có phòng học"}</td>
//                     <td>
//                       {classItem.giang_vien_phu_trach?.ten ||
//                         "Chưa có giảng viên"}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => openAssignModal(classItem._id)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Thêm phân công
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <p>Đang tải...</p>
//       )}

//       {/* Modal for assigning lecturer */}
//       {selectedClassId && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-md w-96">
//             <h3 className="text-lg font-semibold mb-4">Phân công giảng viên</h3>
//             <select
//               className="w-full mb-4 p-2 border rounded"
//               value={selectedTeacherId}
//               onChange={(e) => setSelectedTeacherId(e.target.value)}
//             >
//               <option value="">Chọn giảng viên</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher._id}>
//                   {teacher.ten}
//                 </option>
//               ))}
//             </select>
//             <button
//               className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? "opacity-50" : ""}`}
//               onClick={handleAssignTeacher}
//               disabled={loading}
//             >
//               {loading ? "Đang phân công..." : "Phân công"}
//             </button>
//             {message && <p className="text-red-500 mt-2">{message}</p>}
//             <button
//               className="text-gray-600 mt-2 block w-full text-center"
//               onClick={() => setSelectedClassId(null)}
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetDetailDepartment() {
  const { id } = useParams();
  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) fetchSchedule(id);
    fetchTeachers();
  }, [id]);

  const fetchSchedule = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/schedule/detail-schedule/${id}`);
      const data = await res.json();
      if (data.status === "OK") setScheduleDetail(data.data);
    } catch (error) {
      console.error("Error fetching schedule details", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/teacher/get-all");
      const data = await res.json();
      setTeachers(data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const openAssignModal = (classId) => {
    setSelectedClassId(classId);
    setMessage("");
  };

  const handleAssignTeacher = async () => {
    if (!selectedTeacherId) {
      setMessage("Vui lòng chọn giảng viên.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/assign/assign-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduleId: scheduleDetail._id,
          classId: selectedClassId,
          teacherId: selectedTeacherId,
        }),
      });

      const result = await res.json();
      if (result.status === "OK") {
        setMessage("Phân công thành công!");
        fetchSchedule(id);
        setSelectedTeacherId("");
        setTimeout(() => setSelectedClassId(null), 1000);
      } else {
        setMessage("Phân công thất bại: " + result.message);
      }
    } catch (error) {
      console.error("Assignment error:", error);
      setMessage("Có lỗi xảy ra khi phân công giảng viên.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Danh Sách Lịch Giảng Dạy
      </h2>

      {scheduleDetail ? (
        <div>
          <div className="mb-4">
            <p className="text-lg">
              <strong className="text-gray-700">Thứ trong tuần:</strong>{" "}
              <span className="text-gray-600">{scheduleDetail.dayOfWeek}</span>
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-sm text-left text-gray-600 bg-white">
              <thead className="text-xs uppercase bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3">Mã học phần</th>
                  <th className="px-4 py-3">Sĩ số</th>
                  <th className="px-4 py-3">Lý thuyết/Thực hành</th>
                  <th className="px-4 py-3">Ca học</th>
                  <th className="px-4 py-3">Phòng học</th>
                  <th className="px-4 py-3">Giảng viên phụ trách</th>
                  <th className="px-4 py-3 text-center">Phân công giảng viên</th>
                </tr>
              </thead>
              <tbody>
                {scheduleDetail.classes.map((classItem, index) => (
                  <tr
                    key={classItem._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } border-b`}
                  >
                    <td className="px-4 py-3">{classItem.ma_lop_hoc_phan?.ma_lop_hoc_phan}</td>
                    <td className="px-4 py-3">{classItem.ma_lop_hoc_phan?.si_so}</td>
                    <td className="px-4 py-3">{classItem.ma_lop_hoc_phan?.loai_mon_hoc}</td>
                    <td className="px-4 py-3">{classItem.classTime?.tenCa}</td>
                    <td className="px-4 py-3">{classItem.rooms?.room || "Không có phòng học"}</td>
                    <td className="px-4 py-3">
                      {classItem.giang_vien_phu_trach?.ten || "Chưa có giảng viên"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openAssignModal(classItem._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      >
                        Thêm phân công
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Đang tải...</p>
      )}

      {selectedClassId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Phân công giảng viên</h3>
            <select
              className="w-full p-2 mb-4 border rounded"
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
            >
              <option value="">Chọn giảng viên</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.ten}
                </option>
              ))}
            </select>
            <button
              className={`w-full py-2 rounded text-white ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleAssignTeacher}
              disabled={loading}
            >
              {loading ? "Đang phân công..." : "Phân công"}
            </button>
            {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
            <button
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedClassId(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
