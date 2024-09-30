const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const routes = require("./routes")


dotenv.config()
const app = express();

mongoose.connect(process.env.MONGODB_CONNECT)
.then(() =>{
    console.log("Connect to database")
})
.catch((error) =>{
    console.log(error);
})
app.use(cors());
app.use(cookieParser())
app.use(express.json())

routes(app)
app.listen(5000, () =>{
    console.log("Server is running!!")
})