const { StatusCodes } = require("http-status-codes");
const { BadRequestError, AuthenticationError } = require("../errors");
const UserModel = require("../models/user");
const { setResponseCookies, resetJWTCookie } = require("../utils");


const registerUser=async(req,res,next)=>{
    const {name,email,password}=req.body;

    const emailAlreadyExists=await UserModel.findOne({email});
    if(emailAlreadyExists){
        throw new BadRequestError('email already exists');
    }

    const role=(await UserModel.countDocuments({}))===0?'admin':'user'
    const user=await UserModel.create({name,email,password,role});

    const payload={name:user.name,userId:user._id,role};

    setResponseCookies({res,payload})

    res.status(StatusCodes.CREATED).json({success:true,user:payload})
}
const loginUser=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new BadRequestError('both email and password must be provided')
    }
    const user=await UserModel.findOne({email});
    if(!user){
        throw new AuthenticationError('invalid credentials');
    }
    const result=await user.comparePassword(password);
    if(!result){
        throw new AuthenticationError('invalid credentials');
    }

    const payload={name:user.name,userId:user._id,role:user.role};

    setResponseCookies({res,payload})

    res.status(StatusCodes.OK).json({success:true,user:payload})
}

const logoutUser=async(req,res,next)=>{
    resetJWTCookie(res);
    res.status(StatusCodes.OK).json({success:true,msg:'the user logged out successfully'})
}



module.exports={registerUser,loginUser,logoutUser}

