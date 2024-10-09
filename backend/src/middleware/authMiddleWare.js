const jwt = require("jsonwebtoken");
const BlackList = require("../models/blackListModel")

const authMiddleWare = {
    verifyToken: async (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            
            const blacklisted = await BlackList.findOne({token:accessToken})
            if (blacklisted) {
                return res.status(403).json("Token is blacklisted");
            }
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, teacher) => {
                if (error) {
                    return res.status(403).json({
                        message: error.name === "TokenExpiredError"
                            ? "Token has expired"
                            : "Token is not valid"
                    });
                }
                req.teacher = teacher;
                next();
            });
        } else {
            return res.status(401).json({ message: "You're not authenticated" });
        }
    },

    verifyTokenAdmin: async (req, res, next) => {
        authMiddleWare.verifyToken(req, res, () => {
            if (req.teacher.id == req.params.id || req.teacher.isAdmin) {
                next();
            } else {
                return res.status(403).json({ message: "You're not allowed to perform this action" });
            }
        });
    }
};

module.exports = authMiddleWare