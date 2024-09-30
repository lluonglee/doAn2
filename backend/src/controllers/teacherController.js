const teacherService = require("../services/teacherService");

const teacherController = {
  createTeacher: async (req, res) => {
    try {
        const { ten, email, password, confirmPassword } = req.body;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmailValid = emailRegex.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is required",
      });
    }

    if (!isEmailValid) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid email format",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "Password do not match",
      });
    }

    const response = await teacherService.createTeacher(req.body);
    return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message:"an error occurred while creating teacher",
            err: error.message
        })
    }


  },
};
module.exports = teacherController;