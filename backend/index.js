const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDb = require('./config/db')
const router = require('./routes')

const app = express()

app.use(cors())


app.use("/api",router)

const PORT = 8080 || process.env.PORT

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})