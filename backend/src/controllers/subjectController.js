
const SubjectService = require("../services/subjectService");

const subjectController = {
  createSubject: async (req, res) => {
    try {
      const { ma_mon, ten_mon} = req.body;
      if (!ma_mon || !ten_mon ) {
        return res.status(400).json({
          status: "ERR",
          message: "the input is required",
        });
      }
      const response = await SubjectService.CreateSubject(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  },
};

module.exports = subjectController;
