"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetDetailDepartment() {
  const { id } = useParams();
  const [scheduleDetail, setScheduleDetail] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSchedule(id);
    }
  }, [id]);

  const fetchSchedule = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/schedule/detail-schedule/${id}`);
      const data = await res.json();
      if (data.status === "OK") {
        setScheduleDetail(data.data);
      } else {
        console.error("Failed to fetch department details");
      }
    } catch (error) {
      console.error("Error fetching department details", error);
    }
  };

  return (
    <div>
      <h2 className="text-slate-700 text-2xl">Danh Sách Lịch Giảng Dạy</h2>

      {scheduleDetail ? (
        <div>
          <p className="py-2"><strong>Thứ trong tuần:</strong> {scheduleDetail.dayOfWeek}</p>

          {/* Table to display the list of classes */}
          <h3 className="text-lg mt-4 mb-2">Danh sách Lớp</h3>
          {scheduleDetail.classes.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Mã học phần</th>
                    <th scope="col" className="px-6 py-3">Sĩ số</th>
                    <th scope="col" className="px-6 py-3">Lý thuyết/Thực hành</th>
                    <th scope="col" className="px-6 py-3">Ca học</th>
                    <th scope="col" className="px-6 py-3">Phòng học</th>
                    <th scope="col" className="px-6 py-3">Giảng viên phụ trách</th>
                   
                   
                  </tr>
                </thead>
                <tbody>
                  {scheduleDetail.classes.map((classItem) => (
                    <tr key={classItem._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {classItem.ma_lop_hoc_phan?.ma_lop_hoc_phan}
                      </td>
                     
                      <td className="px-6 py-4">
                        {classItem.ma_lop_hoc_phan?.si_so}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {classItem.ma_lop_hoc_phan?.loai_mon_hoc}
                      </td>
                    
                      <td className="px-6 py-4">
                        {classItem.classTime?.tenCa}
                      </td>
                      <td className="px-6 py-4">
                      {classItem.rooms?.room || "không có phòng học"}
                      </td>
                      <td className="px-6 py-4">
                      {classItem.giang_vien_phu_trach?.ten || "Chua co giang vien phu trach"}
                      </td>

                    
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Không có lớp nào trong lịch trình.</p>
          )}
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
}
