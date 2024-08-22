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

const addNewUser=async(req,res)=>{
    try {
        const {userName,email,password} = req.body
        let user = await User.findOne({email:email})

        if(user){
            return res.status(400).json({message:"Email is already taken"})
        }

        user = new User({userName,email,password})
        await user.save()

        return res.status(200).json({success:true})
    } catch (error) {
        
    }
}

const deleteUser= async(req,res)=>{
    try {
        const userId = req.query.userId

        await User.deleteOne({_id:userId})
        return res.status(200).json({success:true})
    } catch (error) {
        
    }
}

const adminEditProfile = async(req,res)=>{
    try {
        const {userName,email} = req.body
        const userId = req.query.userId

        let user = await User.findOne({$and:[{_id:{$ne:userId}},{email:email}]})

        if(user){
            return res.status(400).json({
                message:"This email is already taken"
            })
        }else{
            user = await User.findByIdAndUpdate(userId,
                {$set:{userName:userName,
                    email:email
                }})
            
            return res.status(200).json({
                success:true
            })
        }
    } catch (error) {
        
    }
}

module.exports = {
    adminLogin,
    getUserDetails,
    addNewUser,
    deleteUser,
    adminEditProfile
}