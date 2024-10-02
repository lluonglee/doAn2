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
        message: "an error occurred while creating teacher",
        err: error.message,
      });
    }
  },
  getAllTeacher: async (req, res) => {
    try {
      const response = await teacherService.getAllTeacher();
      return res.status(200).json(response);
    } catch (error) {
      return {
        status: "ERR",
        message: error.message,
      };
    }
  },
  getDetailTeacher: async (req, res) => {
    try {
      const teacherDetail = req.params.id;
      if (!teacherDetail) {
        return res.status(400).json({
          status: "ERR",
          message: "Teacher ID is required",
        });
      }

      const response = await teacherService.getDetailTeacher(teacherDetail);
      return res.status(200).json(response);
    } catch (error) {
      return {
        status: "ERR",
        message: error.message,
      };
    }
  },
  updateTeacher: async (req, res) => {
    try {
      const teacherId = req.params.id;
      const data = req.body;
      if (!teacherId) {
        return res.status(400).json({
          status: "ERR",
          message: "Teacher Id is required",
        });
      }
      const response = await teacherService.updateTeacher(teacherId, data);
      
      if (response.status === "ERR") {
        return res.status(404).json(response);
      }
      return res.status(200).json(response);
    } catch (error) {
      return {
        status: "ERR",
        message: error.message,
      };
    }
  },
  deleteTeacher: async (req, res) => {
    const teacherID = await req.params.id;

    if (!teacherID) {
      return res.status(400).json({
        status: "ERR",
        message: "Teacher ID is required",
      });
    }


    const response = await teacherService.deleteTeacher(teacherID);
    return res.status(200).json(response);
  },
};
module.exports = teacherController;
