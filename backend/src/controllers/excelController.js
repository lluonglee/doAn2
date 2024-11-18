// const ExcelService = require("../services/excelService");

// const excelController = {
//   importExcel: async (req, res) => {
//     try {
//       const filePath = req.file.path;
//       const importData = await ExcelService.importExcelData(filePath);

//       return res.status(200).json(importData);
//     } catch (error) {
//       return res.status(404).json({
//         error: error.message,
//       });
//     }
//   },
// };

// module.exports = excelController

const ExcelService = require("../services/excelService");

const excelController = {
  importExcel: async (req, res) => {
    try {
      // Check if file is present
      if (!req.file || !req.file.path) {
        return res.status(400).json({
          status: "ERR",
          message: "Không có file đính kèm",
        });
      }

      const filePath = req.file.path;
      const importData = await ExcelService.importExcelData(filePath);

      // Return the result from the import process
      return res.status(200).json(importData);
    } catch (error) {
      console.error("Error in importExcel controller:", error);
      return res.status(500).json({
        status: "ERR",
        message: error.message || "Đã xảy ra lỗi khi xử lý yêu cầu",
      });
    }
  },
};

module.exports = excelController;
