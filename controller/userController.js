const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const UserModel = require("../models/user")


const getAllUsers=async(req,res,next)=>{
    const users=await UserModel.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({succes:true,users})
}

const getSingleUser=async(req,res,next)=>{
    const {params:{id:userId}}=req;
    const user=await UserModel.findOne({_id:userId}).select('-password');
    if(!user){
        throw new NotFoundError('no user with this id is found on the server')
    }
    res.status(StatusCodes.OK).json({succes:true,user})
}


const showCurrentUser=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({msg:'showing the current user'})
}
const updateUserPassword=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({msg:'updating the password'})
}
const updateUser=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({msg:'updating the user data'})
}


module.exports={getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}



