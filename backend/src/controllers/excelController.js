const ExcelService = require("../services/excelService");

const excelController = {
  importExcel: async (req, res) => {
    try {
      const filePath = req.file.path;
      const importData = await ExcelService.importExcelData(filePath);

      return res.status(200).json(importData);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = excelController