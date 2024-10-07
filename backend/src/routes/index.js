const teacherRouter = require("./teacherRouter")
const courseRouter = require("./courseRouter")
const subjectRouter = require("./subjectRouter")

const routes = (app) =>{
    app.use('/api/teacher',teacherRouter)
    app.use('/api/course', courseRouter)
    app.use('/api/subject', subjectRouter)
}

module.exports = routes