const xlsx = require("xlsx");
const Data = require("../models/teacherModels");

const importExcelData = async (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const importData = [];

    for (let row of sheetData) {
      const newData = new Data({
        ten: row.ten,
        email: row.email,
      });

      const saveData = await newData.save();
      importData.push(saveData);
    }

    return {
      status: "OK",
      message: "import successful",
      data: importData,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

module.exports = {
  importExcelData,
};
