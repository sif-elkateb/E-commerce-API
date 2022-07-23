const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const UserModel = require("../models/user");
const { createJWT } = require("../utils");


const registerUser=async(req,res,next)=>{
    const {name,email,password}=req.body;

    const emailAlreadyExists=await UserModel.findOne({email});
    if(emailAlreadyExists){
        throw new BadRequestError('email already exists');
    }

    const role=(await UserModel.countDocuments({}))===0?'admin':'user'
    const user=await UserModel.create({name,email,password,role});

    const tokenUser={name:user.name,userId:user._id};

    const token=createJWT({payload:tokenUser});

    res.status(StatusCodes.CREATED).json({user,token})
}
const loginUser=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({msg:'user loggedin successfully'})
}

const logoutUser=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({msg:'user loggedout successfully'})
}



module.exports={registerUser,loginUser,logoutUser}

