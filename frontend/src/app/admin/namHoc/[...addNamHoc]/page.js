"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 

export default function ClassSectionDetail() {
  const { semesterId } = useParams(); 
  const [classSections, setClassSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("semesterId:", semesterId); // Debugging semesterId
    if (semesterId) {
      const fetchClassSections = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/semester/detail-semester/${semesterId}`);
          const data = await res.json();
          if (data.status === "OK") {
            setClassSections(data.classSections);
          } else {
            setError("Failed to fetch class sections: " + data.message);
          }
        } catch (err) {
          setError("Error fetching class sections: " + err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchClassSections();
    } else {
      setLoading(false); // Stop loading if no semesterId is found
      setError("Semester ID is not provided.");
    }
  }, [semesterId]);

  if (loading) return <p>Loading class sections...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Class Sections for Semester {semesterId}</h2>
      {classSections.length > 0 ? (
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Class Name</th>
            </tr>
          </thead>
          <tbody>
            {classSections.map((section) => (
              <tr key={section._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{section.hoc_ky}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No class sections found for this semester.</p>
      )}
    </div>
  );
}
