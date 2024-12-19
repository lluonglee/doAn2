const { exportExcelData } = require("../services/exportExcelService");

const exportExcelBySemesterId = async (req, res) => {
  try {
    const { semesterId } = req.params;

    // Call the service to export Excel
    const { status, filePath, semester, message } = await exportExcelData(semesterId);

    if (status === "ERR") {
      return res.status(404).json({ status, message });
    }

    // Send the file to the client
    const fileName = `Semester_${semester.hoc_ky}_${semester.nam_hoc}.xlsx`;
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Lỗi khi gửi file:", err);
        return res.status(500).json({ status: "ERR", message: "Không thể gửi file" });
      }
    });
  } catch (error) {
    console.error("Lỗi khi xuất Excel:", error);
    res.status(500).json({
      status: "ERR",
      message: error.message || "Có lỗi xảy ra khi xuất dữ liệu",
    });
  }
};

module.exports = { exportExcelBySemesterId };
