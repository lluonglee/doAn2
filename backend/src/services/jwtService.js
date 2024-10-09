const jwt = require("jsonwebtoken")

const jwtService = {
    generateAccessToken: (teacher) => {
        return jwt.sign(
            {
                id: teacher.id,
                admin: teacher.isAdmin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" } 
        );
    },
    generateRefreshToken: (teacher) =>{
        return jwt.sign(
            {
              id: teacher.id,
              admin: teacher.isAdmin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
          );
    },
   
};

module.exports = jwtService;