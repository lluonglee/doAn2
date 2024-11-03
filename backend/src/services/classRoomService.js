const ClassRoom = require("../models/classRoomModal");

const createClassRoom = async (newClassRoom) => {
  const { room } = newClassRoom;
  try {
    const existingClassRoom = await ClassRoom.findOne({ room });
    if (existingClassRoom) {
      return {
        status: "ERR",
        message: "This class room has already been used",
      };
    }

    const createClassRoom = await ClassRoom.create({
      room,
    });

    return {
      status: "OK",
      message: "Class room created successfully",
      data: createClassRoom,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllClassRoom = async () => {
  try {
    const getAll = await ClassRoom.find();
    return {
      status: "OK",
      message: "get all class room Successful",
      data: getAll,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};

const detailClassRoom = async (id) => {
  try {
    const room = await ClassRoom.findById(id);

    if (!room) {
      return {
        status: "ERR",
        message: "Class room was not found",
      };
    }

    return {
      status: "OK",
      message: "Successfully fetched class room details",
      data: room,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const updateClassRoom = async (id, data) => {
  try {
    const existingClassRoom = await ClassRoom.findById(id);

    if (!existingClassRoom) {
      return {
        status: "ERR",
        message: "Class room not found",
      };
    }

    const updated = await ClassRoom.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "Ok",
      message: "class room updated successfully",
      data: updated,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteClassRoom = async (id) => {
  try {
    const classRoomID = await ClassRoom.findById(id);
    if (!classRoomID) {
      return {
        status: "ERR",
        message: "not found class room ID",
      };
    }

    await ClassRoom.findByIdAndDelete(classRoomID);
    return {
      status: "Ok",
      message: "Delete class room successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
module.exports = {
  createClassRoom,
  getAllClassRoom,
  detailClassRoom,
  updateClassRoom,
  deleteClassRoom,
};
