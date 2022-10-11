
const express=require('express')

const dotenv=require('dotenv')
const colors=require('colors')
const morgan=require('morgan')
const path = require('path')
const connectDB=require('./config/db')
const server=express()
server.use(morgan('dev'))
server.use(express.json({}))
server.use(express.json({
    extended: true
}))


dotenv.config({path:`./config/config.env`})
const PORT =process.env.PORT
connectDB()
server.use('/api/todo/auth',require('./routes/user'))
server.listen(PORT,(req,res)=>{

console.log(`Server is running on port: ${PORT}`);



})

















































// const express=require('express')
// const colors=require('colors')
// const dotenv=require('dotenv')
// const morgan=require('morgan')
// const connectDB=require('./config/db')
// const server=express()
// server.use(morgan('dev'))
// server.use(express.json({}))
// server.use(express.json({
//     extended: true
// }))

// dotenv.config({path:`./config/config.env`})
// const PORT=process.env.PORT  || 3000


// server.use('/api/todo/auth',require('./routes/user'))


// connectDB()
// server.listen(PORT,'localhost',(req,res)=>{

//     console.log(`server is running on port: ${PORT}`);

// })

