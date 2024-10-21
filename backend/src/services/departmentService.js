const Department = require("../models/departmentModel");
const Teacher = require("../models/teacherModels")

const createDepartment = async (newDepartment) => {
  const { ma_khoa, ten_khoa, ghi_chu } = newDepartment;
  try {
    const existingDepart = await Department.findOne({ ma_khoa });
    if (existingDepart) {
      return {
        status: "ERR",
        message: "This ma khoa has already been used",
      };
    }

    const createDepartment = await Department.create({
      ma_khoa,
      ten_khoa,
      ghi_chu,
    });

    return {
      status: "OK",
      message: "Department created successfully",
      data: createDepartment,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const getAllDepartment = async () => {
  try {
    const getAll = await Department.find();
    return {
      status: "OK",
      message: "get all Department Successful",
      data: getAll,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: err.message,
    };
  }
};
// const detailDepartment = async (id) => {
//   try {
//     const depart = await Department.findById(id);

//     if (!depart) {
//       return {
//         status: "ERR",
//         message: "the department not found",
//       };
//     }

//     return {
//       status: "OK",
//       message: "Successfully",
//       data: depart,
//     };
//   } catch (error) {
//     return {
//       status: "ERR",
//       message: error.message,
//     };
//   }
// };

const detailDepartment = async (id) => {
  try {
    const depart = await Department.findById(id).populate('giang_vien_trong_khoa'); // Populate teacher details

    if (!depart) {
      return {
        status: "ERR",
        message: "The department was not found",
      };
    }

    return {
      status: "OK",
      message: "Successfully fetched department details",
      data: depart,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};

const updateDepartment = async (id, data) => {
  try {
    const existingDepartment = await Department.findById(id);

    if (!existingDepartment) {
      return {
        status: "ERR",
        message: "Department not found",
      };
    }

    const updated = await Department.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "Ok",
      message: "Department updated successfully",
      data: updated,
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};
const deleteDepartment = async (id) => {
  try {
    const departmentID = await Department.findById(id);
    if (!departmentID) {
      return {
        status: "ERR",
        message: "not found department ID",
      };
    }

    await Department.findByIdAndDelete(departmentID);
    return {
      status: "Ok",
      message: "Delete department successful",
    };
  } catch (error) {
    return {
      status: "ERR",
      message: error.message,
    };
  }
};


const assignDepartmentToTeacher = async (departmentId, teacherId) =>{
  try{
    const department = await Department.findById(departmentId);
    if(!department){
      return{
        status: "ERR",
        message:"can not find department"
      }
    }

    const teacher = await Teacher.findById(teacherId);
    if(!teacher){
      return{
        status:"ERR",
        message:"can't not find teacher"
      }
    }

    teacher.department = department._id;
    await teacher.save();

    department.giang_vien_trong_khoa.push(teacher._id);
    await department.save();


    return {
      status:"OK",
      message: "assign successful",
      data: department
    }



  }catch(error){

    return {
      status: "ERR",
      message: error.message,
    };

  }
}
module.exports = {
  createDepartment,
  getAllDepartment,
  detailDepartment,
  updateDepartment,
  deleteDepartment,
  assignDepartmentToTeacher
};
