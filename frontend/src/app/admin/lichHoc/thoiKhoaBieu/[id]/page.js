// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function GetDetailDepartment() {
//   const { id } = useParams();
//   const [scheduleDetail, setScheduleDetail] = useState(null);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedClassId, setSelectedClassId] = useState(null);
//   const [selectedTeacherId, setSelectedTeacherId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (id) fetchSchedule(id);
//     fetchTeachers();
//   }, [id]);

//   const fetchSchedule = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/schedule/detail-schedule/${id}`);
//       const data = await res.json();
//       if (data.status === "OK") setScheduleDetail(data.data);
//     } catch (error) {
//       console.error("Error fetching schedule details", error);
//     }
//   };

//   const fetchTeachers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/teacher/get-all");
//       const data = await res.json();
//       setTeachers(data.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const openAssignModal = (classId) => {
//     setSelectedClassId(classId);
//     setMessage("");
//   };

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
//           scheduleId: scheduleDetail._id,
//           classId: selectedClassId,
//           teacherId: selectedTeacherId,
//         }),
//       });

//       const result = await res.json();
//       if (result.status === "OK") {
//         setMessage("Phân công thành công!");
//         fetchSchedule(id);
//         setSelectedTeacherId("");
//         setTimeout(() => setSelectedClassId(null), 1000);
//       } else {
//         setMessage("Phân công thất bại: " + result.message);
//       }
//     } catch (error) {
//       console.error("Assignment error:", error);
//       setMessage("Có lỗi xảy ra khi phân công giảng viên.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//         Danh Sách Lịch Giảng Dạy
//       </h2>

//       {scheduleDetail ? (
//         <div>
//           <div className="mb-4">
//             <p className="text-lg">
//               <strong className="text-gray-700">Thứ trong tuần:</strong>{" "}
//               <span className="text-gray-600">{scheduleDetail.dayOfWeek}</span>
//             </p>
//           </div>

//           <div className="overflow-x-auto rounded-lg shadow-lg">
//             <table className="w-full text-sm text-left text-gray-600 bg-white">
//               <thead className="text-xs uppercase bg-blue-600 text-white">
//                 <tr>
//                   <th className="px-4 py-3">Mã học phần</th>
//                   <th className="px-4 py-3">Sĩ số</th>
//                   <th className="px-4 py-3">Lý thuyết/Thực hành</th>
//                   <th className="px-4 py-3">Ca học</th>
//                   <th className="px-4 py-3">Phòng học</th>
//                   <th className="px-4 py-3">Giảng viên phụ trách</th>
//                   <th className="px-4 py-3 text-center">Phân công giảng viên</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {scheduleDetail.classes.map((classItem, index) => (
//                   <tr
//                     key={classItem._id}
//                     className={`${
//                       index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                     } border-b`}
//                   >
//                     <td className="px-4 py-3">{classItem.ma_lop_hoc_phan?.ma_lop_hoc_phan}</td>
//                     <td className="px-4 py-3">{classItem.ma_lop_hoc_phan?.si_so}</td>
//                     <td className="px-4 py-3">{classItem.ma_lop_hoc_phan?.loai_mon_hoc}</td>
//                     <td className="px-4 py-3">{classItem.classTime?.tenCa}</td>
//                     <td className="px-4 py-3">{classItem.rooms?.room || "Không có phòng học"}</td>
//                     <td className="px-4 py-3">
//                       {classItem.giang_vien_phu_trach?.ten || "Chưa có giảng viên"}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <button
//                         onClick={() => openAssignModal(classItem._id)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
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
//         <p className="text-center text-gray-500">Đang tải...</p>
//       )}

//       {selectedClassId && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Phân công giảng viên</h3>
//             <select
//               className="w-full p-2 mb-4 border rounded"
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
//               className={`w-full py-2 rounded text-white ${
//                 loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//               }`}
//               onClick={handleAssignTeacher}
//               disabled={loading}
//             >
//               {loading ? "Đang phân công..." : "Phân công"}
//             </button>
//             {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
//             <button
//               className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
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
  const [isUpdating, setIsUpdating] = useState(false);  // Thêm state để kiểm tra xem đang cập nhật hay không

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
    const classItem = scheduleDetail.classes.find((item) => item._id === classId);
    if (classItem && classItem.giang_vien_phu_trach) {
      setSelectedTeacherId(classItem.giang_vien_phu_trach._id);  // Giả sử giảng viên hiện tại được lưu trong trường 'giang_vien_phu_trach'
      setIsUpdating(true); // Nếu đã có giảng viên, cho phép cập nhật
    } else {
      setSelectedTeacherId("");  // Reset khi chưa có giảng viên
      setIsUpdating(false);
    }
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

  const handleUpdateTeacher = async () => {
    if (!selectedTeacherId) {
      setMessage("Please select a teacher."); // Thông báo nếu không chọn giảng viên.
      return;
    }
  
    setLoading(true); // Hiển thị trạng thái đang tải.
    try {
      const res = await fetch("http://localhost:5000/api/assign/update-teacher", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduleId: scheduleDetail._id,
          classId: selectedClassId,
          newTeacherId: selectedTeacherId, // Dữ liệu được gửi đến API.
        }),
      });
  
      const result = await res.json();
      if (res.ok) {
        setMessage("Teacher updated successfully!"); // Thông báo thành công.
        fetchSchedule(scheduleDetail._id); // Làm mới danh sách lịch học.
        setSelectedClassId(null);
        setSelectedTeacherId("");
      } else {
        setMessage("Error: " + result.message); // Hiển thị lỗi từ backend.
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Error occurred while updating the teacher."); // Thông báo lỗi mạng.
    } finally {
      setLoading(false); // Tắt trạng thái đang tải.
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
                        {classItem.giang_vien_phu_trach ? "Cập nhật giảng viên" : "Thêm phân công"}
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {isUpdating ? "Cập nhật giảng viên" : "Phân công giảng viên"}
            </h3>
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
              onClick={isUpdating ? handleUpdateTeacher : handleAssignTeacher}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : isUpdating ? "Cập nhật" : "Phân công"}
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
