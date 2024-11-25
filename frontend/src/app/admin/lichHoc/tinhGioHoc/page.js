"use client";

import { useEffect, useState } from 'react';

export default function Page() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teacher/get-all');
        const result = await response.json();
        if (result.status === "OK") {
          const calculatedData = result.data.map(teacher => {
            let totalHours = 0;
            const classDetails = [];

            // Duyệt qua các lịch giảng dạy và lấy thông tin lớp học phần
            teacher.schedules.forEach(schedule => {
              schedule.classes.forEach(classItem => {
                const tinChiLyThuyet = classItem.ma_lop_hoc_phan.subject.tin_chi_ly_thuyet;
                
                // Tính tổng giờ giảng dạy
                if (tinChiLyThuyet === 2) {
                  totalHours += 30;
                } else if (tinChiLyThuyet === 1) {
                  totalHours += 15;
                }
                
                // Thêm thông tin lớp học phần
                classDetails.push({
                  maLopHocPhan: classItem.ma_lop_hoc_phan.ma_lop_hoc_phan,
                  tenMon: classItem.ma_lop_hoc_phan.subject.ten_mon,
                  soTinChi: classItem.ma_lop_hoc_phan.subject.so_tin_chi,
                  soTietTrucTiep: classItem.ma_lop_hoc_phan.so_tiet_truc_tiep,
                  dayOfWeek: schedule.dayOfWeek
                });
              });
            });

            return {
              ten: teacher.ten,
              email: teacher.email,
              tongGioGiangDay: totalHours,
              classDetails: classDetails // Thêm thông tin lớp học phần vào mỗi giáo viên
            };
          });

          setTeachers(calculatedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Giờ Giảng Dạy</h1>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Tổng Giờ Giảng Dạy</th>
            <th>Lớp Học Phần</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.ten}</td>
              <td>{teacher.email}</td>
              <td>{teacher.tongGioGiangDay} giờ</td>
              <td>
                <ul>
                  {teacher.classDetails.map((classItem, idx) => (
                    <li key={idx}>
                      {classItem.tenMon} ({classItem.maLopHocPhan}) - {classItem.soTinChi} tín chỉ, {classItem.soTietTrucTiep} tiết - {classItem.dayOfWeek}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
