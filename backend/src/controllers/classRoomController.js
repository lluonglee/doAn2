const ClassRoomService = require("../services/classRoomService")

const classRoomController = {
    createClassRoom: async (req, res) => {
      try {
        const { room } = req.body;
        if (!room ) {
          return res.status(400).json({
            status: "ERR",
            message: "the input is required",
          });
        }
        const response = await ClassRoomService.createClassRoom(req.body);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(404).json({
          error: error.message,
        });
      }
    },
    getAllClassRoom: async (req, res) => {
      try {
        const getAll = await ClassRoomService.getAllClassRoom();
        return res.status(200).json(getAll);
      } catch (err) {
        return {
          status: "ERR",
          message: err.message,
        };
      }
    },
    getDetailClassRoom: async (req, res) => {
      try {
        const classRoomIdDetail = req.params.id;
  
        if (!classRoomIdDetail) {
          return res.status(400).json({
            status: "ERR",
            message: "class room ID is required",
          });
        }
  
        const response = await ClassRoomService.detailClassRoom(
            classRoomIdDetail
        );
  
        return res.status(200).json(response);
      } catch (err) {
        return {
          status: "ERR",
          message: err.message,
        };
      }
    },
    updateClassRoom: async (req, res) => {
      try {
        const classRoomId = req.params.id;
        const data = req.body;
  
        if (!classRoomId) {
          return res.status(400).json({
            status: "ERR",
            message: "Class room ID is required",
          });
        }
  
        const response = await ClassRoomService.updateClassRoom(
            classRoomId,
          data
        );
  
        if (response.status === "ERR") {
          return res.status(404).json(response);
        }
  
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({
          status: "ERR",
          message: "An error ocurred while updating the user",
          err: error.message,
        });
      }
    },
    deleteClassRoom: async (req, res) => {
      try {
        const classRoomID = req.params.id;
        if (!classRoomID) {
          return res.status(400).json({
            status: "ERR",
            message: "not found class room",
          });
        }
  
        const response = await ClassRoomService.deleteClassRoom(classRoomID);
        return res.status(200).json(response);
      } catch (err) {
        return res.status(404).json({
          status: "ERR",
          message: err.message,
        });
      }
    },
   
  };
  module.exports = classRoomController;