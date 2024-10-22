"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetDetail() {
  const { id } = useParams();
  const [semesterDetail, setSemesterDetail] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSemesterDetail(id);
    }
  }, [id]);

  const fetchSemesterDetail = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/semester/detail-semester/${id}`
      );
      const data = await res.json();
      if (data.status === "OK") {
        setSemesterDetail(data.data);
      } else {
        console.error("Failed to fetch semester details:", data.message);
      }
    } catch (error) {
      console.error("Error fetching semester details:", error);
    }
  };

  return (
    <div>
      <h2 className="text-slate-700 text-2xl">Chi tiết năm học</h2>
      {semesterDetail ? (
        <div>
          <p className="py-2"><strong>Học kỳ: </strong> {semesterDetail.hoc_ky}</p>
          <p className="py-2"><strong>Năm Học: </strong> {semesterDetail.nam_hoc}</p>

          <h3>Danh sách Lớp học phần và môn học trong học kỳ:</h3>
          {semesterDetail.cac_lop_hoc_phan.length > 0 ? (
            <table className="mt-4 table-auto w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Mã lớp</th>
                  <th className="px-4 py-2">Sĩ số</th>
                  <th className="px-4 py-2">Loại môn học</th>
                  <th className="px-4 py-2">Môn học</th>
                  <th className="px-4 py-2">Mã môn</th>
                  <th className="px-4 py-2">Số tín chỉ</th>
                  <th className="px-4 py-2">Khoa</th>
                  <th className="px-4 py-2">Mã khoa</th>
                  <th className="px-4 py-2">Thời khóa biểu</th>
                </tr>
              </thead>
              <tbody>
                {semesterDetail.cac_lop_hoc_phan.map((course) => (
                  <tr key={course._id} className="bg-white border-b">
                    <td className="px-4 py-2">{course.ma_lop_hoc_phan}</td>
                    <td className="px-4 py-2">{course.si_so}</td>
                    <td className="px-4 py-2">{course.loai_mon_hoc}</td>
                    
                    {/* Subject Details */}
                    <td className="px-4 py-2">
                      {course.subject ? course.subject.ten_mon : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {course.subject ? course.subject.ma_mon : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {course.subject ? course.subject.so_tin_chi : "N/A"}
                    </td>
                    
                    {/* Department Details */}
                    <td className="px-4 py-2">
                      {course.department ? course.department.ten_khoa : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {course.department ? course.department.ma_khoa : "N/A"}
                    </td>

                    {/* Timetable */}
                    <td className="px-4 py-2">
                      {course.tkb.map((tkb) => (
                        <div key={tkb._id}>
                          {tkb.thu} - Tiết: {tkb.tiet}, Giờ: {tkb.gio}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có lớp học phần nào.</p>
          )}
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
}
