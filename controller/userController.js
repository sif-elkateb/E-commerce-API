const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError, AuthenticationError } = require("../errors");
const UserModel = require("../models/user");
const { createJWTPayload, setResponseCookies, checkPermissions } = require("../utils");


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
    
    checkPermissions(req.user,user._id)
    res.status(StatusCodes.OK).json({success:true,user})
}


const showCurrentUser=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({success:true,user:req.user})
}
const updateUserPassword=async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword ||!newPassword){
        throw new BadRequestError('both old password and new password must be provided');
    }
    const user=await UserModel.findOne({_id:req.user.userId});

    const comparePasswords=user.comparePassword(oldPassword);
    if(!comparePasswords){
        throw new AuthenticationError('the old password is wrong');
    }
    user.password=newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({success:true,msg:'password updated successfully',user:req.user})
}
const updateUser=async(req,res,next)=>{
    const {email,name,password}=req.body;
    if(!email||!name||!password){
        throw new BadRequestError('both email and name must be provided');
    }
    const user=await UserModel.findOne({_id:req.user.userId});
    const comparePasswords=await user.comparePassword(password);
    if(!comparePasswords){
        throw new AuthenticationError('the password provided is wrong')
    }
    user.name=name;
    user.email=email;
    await user.save();
    const payload=await createJWTPayload({user});
    setResponseCookies({res,payload})

    res.status(StatusCodes.OK).json({success:true,msg:'updated the user',user:payload})
}


module.exports={getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword}



