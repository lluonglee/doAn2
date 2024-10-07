const Subject = require("../models/subjectModel");

const CreateSubject = async (newSubject) => {
  const { ma_mon, ten_mon } = newSubject;

  try {
    const existingSubject = await Subject.findOne({ ma_mon });
    if (existingSubject) {
      return {
        status: "ERR",
        message: "this ma mon has already been used",
      };
    }

    const createSubject = await Subject.create({
      ma_mon,
      ten_mon
     
    });

    return {
      status: "OK",
      message: "Subject created Successful",
      data: createSubject,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

module.exports = {
  CreateSubject,
};
