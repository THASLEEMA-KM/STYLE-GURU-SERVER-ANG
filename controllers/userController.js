const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
// register

exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    const {username,email,password} = req.body

    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("account Already Exist... Please Login")
        }else{
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        console.log(existingUser);
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,token
            })
        }else{
            
            res.status(200).json("Invalid Email / Password")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}


