const mongoose = require('mongoose')

connectionString = process.env.CONNECTION_STRING
console.log(connectionString);
mongoose.connect(connectionString).then((res)=>{
    console.log("Db connected suuccessfully");
}).catch((err)=>{
    console.log("DB connection failed");
    console.log(err);
})