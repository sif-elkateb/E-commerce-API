const { StatusCodes } = require("http-status-codes")


const loginUser=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({msg:'user loggedin successfully'})
}

const logoutUser=async(req,res,next)=>{
    res.status(StatusCodes.OK).json({msg:'user loggedout successfully'})
}

const registerUser=async(req,res,next)=>{
    res.status(StatusCodes.CREATED).json({msg:'user registered successfully'})
}


module.exports={registerUser,loginUser,logoutUser}

