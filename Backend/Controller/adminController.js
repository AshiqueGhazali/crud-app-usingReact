const User = require('../Model/userSchema')
const jwt = require('jsonwebtoken');




const adminLogin = async(req,res)=>{
    try {
        const {userName,password} = req.body
        const admin = process.env.ADMIN_USERNAME
        const adminPassword = process.env.ADMIN_PASSWORD 
        
        if(userName===admin && password===adminPassword){
            let jwtSecretKey =process.env.JWT_SECRET_KEY;

            let data= {
                time:Date.now(),
                userName:admin,
            }

            const token = jwt.sign(data, jwtSecretKey,{expiresIn:'1h'})

            return res.status(200).json({
                success:true,
                jwtToken:token,
            })
        }else{
            return res.status(400).json({message:'Incorrect username and password'})
        }
    } catch (error) {
        
    }
}


const getUserDetails = async(req,res)=>{
    try {
        const usersData = await User.find()

        res.status(200).json({success:true,usersData})
    } catch (error) {
        
    }
}

module.exports = {
    adminLogin,
    getUserDetails
}