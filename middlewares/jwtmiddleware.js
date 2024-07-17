const jwt = require('jsonwebtoken')

const jwtmiddleware = (req,res,next)=>{
    try {
      const token = req.headers['authorization'].split(" ")[1]
        if(token){
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            req.payload = jwtResponse.userId
            next()
        }else{
            res.status(406).json("Authorisation Failed. Please provide token")
        }
    } catch (error) {
        console.log(error);
        res.status(401).json("Authorisation Failed..Please Login")
    }
}


module.exports = jwtmiddleware

