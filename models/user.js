const mongoose=require('mongoose');

const validator = require('validator');


const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'the name of the user must be provided'],
        minLength:3,
        maxLength:15
    },
    email:{
        type:String,
        required:[true,'the email of the user must be provided'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'A valid email must be provided'
        }
    },
    password:{
        type:String,
        required:[true,'the password of the user must be provided'],
        validate:{
            validator:validator.isStrongPassword,
            message:'a strong password must be provided'
        }
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true})

const UserModel=mongoose.model('User',UserSchema);


module.exports=UserModel