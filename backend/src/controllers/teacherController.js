const teacherService = require("../services/teacherService");
const Teacher = require("../models/teacherModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Blacklist = require("../models/blackListModel");

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
  generateAccessToken: (teacher) => {
    return jwt.sign(
      {
        id: teacher._id, // Use _id instead of id
        admin: teacher.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "50s" }
    );
  },
  loginTeacher: async (req, res) => {
    try {
      console.log("Login attempt:", req.body.email);
      const teacher = await Teacher.findOne({ email: req.body.email });
      if (!teacher) {
        console.log("No teacher found with this email");
        return res.status(404).json({ message: "wrong email!!" });
      }
      console.log("Teacher found:", teacher);

      const validPassword = await bcrypt.compare(
        req.body.password,
        teacher.password
      );
      if (!validPassword) {
        console.log("Invalid password");
        return res.status(404).json({ message: "wrong password!!" });
      }

      if (teacher && validPassword) {
        const accessToken = teacherController.generateAccessToken(teacher);
        const { password, ...others } = teacher._doc;
        console.log("Login successful:", others);
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      console.log("Error during login:", err);
      res.status(500).json(err);
    }
  },

  logoutTeacher: async (req, res) => {
    const token = req.headers.token;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const accessToken = token.split(" ")[1];

    try {
      const decoded = jwt.decode(accessToken);
      const expiration = new Date(decoded.exp * 1000);

      const blacklistedToken = new Blacklist({
        token: accessToken,
        expiresAt: expiration,
      });

      await blacklistedToken.save();

      return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Error during logout", err });
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
