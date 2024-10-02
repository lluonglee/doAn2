const teacherRouter = require("./teacherRouter")
const courseRouter = require("./courseRouter")


const routes = (app) =>{
    app.use('/api/teacher',teacherRouter)
    app.use('/api/course', courseRouter)
}

module.exports = routes