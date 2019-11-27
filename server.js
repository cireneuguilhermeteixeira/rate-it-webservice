const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register Routes
const userRouter = require('./routes/user-routes')
const authUserRouter = require('./routes/authUser-routes')

const evaluationRouter = require('./routes/evaluation-routes')

const uri = '/api/v1'


app.all("*", function (req, res, next) {
    next() 
})

app.use(`${uri}/user`,userRouter)
app.use(`${uri}/authUser`,authUserRouter)
app.use(`${uri}/evaluation`,evaluationRouter)



// Inite server
const port = process.env.PORT || 3000
app.listen( port, ()=> console.log(`servidor rodando em na porta ${port}`))