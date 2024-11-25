import Link from "next/link";
export default function LichHoc() {
  return (
    <div className=" flex justify-center ">
      {" "}
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <Link href="/admin/lichHoc/caHoc">Sắp xếp ca học</Link>
      </button>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <Link href="/admin/lichHoc/thoiKhoaBieu">Sắp xếp thời khóa biểu</Link>
      </button>

      <button
        type="button"
        className="text-white bg-orange-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <Link href="/admin/lichHoc/tinhGioHoc">Tính giờ GV</Link>
      </button>
    </div>
  );
}
