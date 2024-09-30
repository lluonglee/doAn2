const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherModels");
const createTeacher = async(newTeacher) =>{
    const {ten, email, password} = newTeacher;
    try{
        const existingTeacher = await Teacher.findOne({email});
        if(existingTeacher){
            return {
                status:"ERR",
                message:"This email has already been used"
            }
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const createTeacher = await Teacher.create({
            ten,
            email,
            password: hashedPassword
        })

        return {
            status: "OK",
            message:"Teacher created successfully",
            data: createTeacher
        }

    }catch(error){
        return {
            status:"ERR",
            message: error.message
        }

    }
}

module.exports={
    createTeacher
}