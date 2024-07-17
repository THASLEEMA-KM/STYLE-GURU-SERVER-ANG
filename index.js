require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./DB/connection')
const router = require('./routes/router')

const sgServer = express()

sgServer.use(cors())
sgServer.use(express.json())
sgServer.use(router)



const PORT = 3000 || process.env.PORT

sgServer.listen(PORT, () =>
{
    console.log(`Style Guru server started at port : ${PORT}`);
})

sgServer.get('/',( req,res)=>{
    res.send(`<h1> Style Guru server started at port : ${PORT} and waiting for client request </h1>`)
})