"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GetDetail() {
  const { id } = useParams(); // Get the `id` from the dynamic route
  const [semesterDetail, setSemesterDetail] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch semester details by id
      fetchSemesterDetail(id);
    }
  }, [id]);

  // Function to fetch semester details
  const fetchSemesterDetail = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/semester/detail-semester/${id}`);
      const data = await res.json();
      if (data.status === 'OK') {
        setSemesterDetail(data.data);
      } else {
        console.error('Failed to fetch semester details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching semester details:', error);
    }
  };

  return (
    <div>
      <h2>Chi tiết học kỳ</h2>
      {semesterDetail ? (
        <div>
          <p>Học kỳ: {semesterDetail.hoc_ky}</p>
          <p>Năm học: {semesterDetail.nam_hoc}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
}
