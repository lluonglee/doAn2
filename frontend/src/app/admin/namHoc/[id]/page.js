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
      <h2>Chi tiết học kỳ</h2>
      {semesterDetail ? (
        <div>
          <p>Học kỳ: {semesterDetail.hoc_ky}</p>
          <p>Năm học: {semesterDetail.nam_hoc}</p>

          {/* Display course details */}
          <h3>Danh sách lớp học phần:</h3>
          {semesterDetail.cac_lop_hoc_phan.length > 0 ? (
            <ul>
              {semesterDetail.cac_lop_hoc_phan.map((course) => (
                <li key={course._id}>
                  Mã lớp: {course.ma_lop_hoc_phan}, Sĩ số: {course.si_so}, Loại
                  môn học: {course.loai_mon_hoc}
                  {/* Add other course fields as needed */}
                </li>
              ))}
            </ul>
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
