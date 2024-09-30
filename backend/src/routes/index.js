const teacherRouter = require("./teacherRouter")

const routes = (app) =>{
    app.use('/api/teacher',teacherRouter)
}

module.exports = routes