const teacherRouter = require("./teacherRouter")
const courseRouter = require("./courseRouter")
const subjectRouter = require("./subjectRouter")
const assignRouter = require("./assignRoute")
const departmentRouter = require("./departmentRouter")
const semesterRouter = require("./semesterRouter")
const routes = (app) =>{
    app.use('/api/teacher',teacherRouter)
    app.use('/api/course', courseRouter)
    app.use('/api/subject', subjectRouter)
    app.use('/api/assign', assignRouter);
    app.use('/api/department', departmentRouter)
    app.use('/api/semester', semesterRouter)
}

module.exports = routes