const User = require('../Model/userSchema')
const jwt = require('jsonwebtoken');



const createUser = async(req,res)=>{
    try {
        const {userName,email,password}=req.body
        
        const isUser = await User.findOne({email:email})

        if(isUser){
            return res.status(400).json({message:'This email is already used'})
        }

        const user = new User({
            userName,
            email,
            password
        })

        await user.save()
        res.status(200).json({success:true})
        
    } catch (error) {
        
    }
}


const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body        

        const user = await User.findOne({email:email})

        if(user && user.password===password){
            let jwtSecretKey =process.env.JWT_SECRET_KEY;

            let data= {
                time:Date.now(),
                userName:user.userName,
                userId:user._id
            }

            const token = jwt.sign(data, jwtSecretKey,{expiresIn:'1h'})

            return res.status(200).json({
                success:true,
                jwtToken:token,
                userData:user
            })
        }else{
            return res.status(400).json({message:'Email or password is incorrect'})
        }
        
    } catch (error) {
        
    }
}


const updateProfile=async(req,res)=>{
    try {
        const {userName,email} = req.body
        const userId = req.query.userId

        let user = await User.findById(userId)

        if(user){
          user = await User.findByIdAndUpdate(userId,
                {$set:{userName:userName,
                    email:email
                }})
            
            return res.status(200).json({
                success:true,
                userData:user
            })
        }else{
            return res.status(400).json({message:'an error occure'})
        }
        
    } catch (error) {
        
    }
}

const updateImage = async(req,res)=>{
    try {
        const {imageUrl, userId} = req.body        

        const user = await User.findByIdAndUpdate(userId,{$set:{imageURL:imageUrl}})
        return res.status(200).json({success:true,imageUrl})        
        
    } catch (error) {
        
    }
}

module.exports = {
    createUser,
    userLogin,
    updateProfile,
    updateImage
}