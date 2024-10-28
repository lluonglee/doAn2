"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import ModalTKB from "./ModalTKB";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const openModal = () => setIsOpen(true);

  // Function to close the modal
  const closeModal = () => setIsOpen(false);

  // Fetch schedules from the server
  const fetchSchedules = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/schedule/get-all");
      const data = await res.json();
      if (res.ok && data.status === "OK") {
        setSchedules(data.data); // Update state with fetched data
      } else {
        console.error("Failed to fetch schedule:", data.message);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedules(); // Call the function correctly with parentheses
  }, []);

  return (
    <div>
      thoi khoa bieu
      <div>
        <div className="relative overflow-x-auto shadow-md ml-3 mr-3">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 align-middle text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Thứ - Ngày học
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {schedule.dayOfWeek}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Render modal if isOpen is true */}
      {isOpen && <ModalTKB closeModal={closeModal} />}
    </div>
  );
}


{
  /* <th scope="col" class="px-6 py-3">
                  Ca học
                </th>
                <th scope="col" class="px-6 py-3">
                  Thời gian
                </th>
                <th scope="col" class="px-6 py-3">
                  Phòng
                </th>
                <th scope="col" class="px-6 py-3">
                  Thao tác
                </th> */
}

{
  /* <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={openModal}
                  >
                    Edit
                  </a>
                  <Trash2 className="cursor-pointer" />
                </td> */
}
{
  /* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Thứ 3
                </th>
                <td class="px-6 py-4">White</td>
                <td class="px-6 py-4">Laptop PC</td>
                <td class="px-6 py-4">$1999</td>
                <td class="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={openModal}
                  >
                    Edit
                  </a>
                  <Trash2 className="cursor-pointer" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Thức 4
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
                <td class="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={openModal}
                  >
                    Edit
                  </a>
                  <Trash2 className="cursor-pointer" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Thứ 5
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
                <td class="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={openModal}
                  >
                    Edit
                  </a>
                  <Trash2 className="cursor-pointer" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Thứ 6
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
                <td class="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={openModal}
                  >
                    Edit
                  </a>
                  <Trash2 className="cursor-pointer" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Thứ 7
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
                <td class="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={openModal}
                  >
                    Edit
                  </a>
                  <Trash2 className="cursor-pointer" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Chủ nhật
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
                <td class="px-6 py-4 flex gap-5 justify-center">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={openModal}
                  >
                    Edit
                  </a>
                  <Trash2 className="cursor-pointer" />
                </td>
              </tr> */
}
