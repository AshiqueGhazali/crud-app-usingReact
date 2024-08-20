const mongoose = require('mongoose')


const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        default:'empty'
    }
},{
    timestamps: true 
})

module.exports=mongoose.model("User",userSchema)