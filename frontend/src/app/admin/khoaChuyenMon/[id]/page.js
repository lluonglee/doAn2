"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetDetailDepartment() {
  const { id } = useParams();
  const [departmentDetail, setDepartmentDetail] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDepartment(id);
    }
  }, [id]);

  const fetchDepartment = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/department/detail-department/${id}`);
      const data = await res.json();
      if (data.status === "OK") {
        setDepartmentDetail(data.data);
      } else {
        console.error("Failed to fetch department details");
      }
    } catch (error) {
      console.error("Error fetching department details", error);
    }
  };

  return (
    <div>
      <h2 className="text-slate-700 text-2xl">Danh Sách Giảng Viên Trong Khoa</h2>

      {departmentDetail ? (
        <div>
          <p className="py-2"><strong>Mã Khoa:</strong> {departmentDetail.ma_khoa}</p>
          <p><strong>Tên Khoa:</strong> {departmentDetail.ten_khoa}</p>

          {/* Table to display the list of teachers */}
          <h3 className="text-lg mt-4 mb-2">Danh sách Giảng viên:</h3>
          {departmentDetail.giang_vien_trong_khoa.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Tên Giảng Viên</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentDetail.giang_vien_trong_khoa.map((teacher) => (
                    <tr key={teacher._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {teacher.ten}
                      </td>
                      <td className="px-6 py-4">{teacher.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Không có giảng viên nào trong khoa.</p>
          )}
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
}
