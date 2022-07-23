const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors")


const errorHandlerMiddleware=(err,req,res,next)=>{
    // if(err instanceof CustomError){
    //     return res.status(err.statusCode).json({msg:err.message})
    // }



    const customError={
        message:err.message||'Error occured at the server please try again later',
        statusCode:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err.name==='ValidationError'){
        customError.message=Object.values(err.errors).map(e=>e.message).join(',');
        customError.statusCode=StatusCodes.BAD_REQUEST;
    }
    if(err.code===11000){
        customError.message='The '+Object.keys(err.keyValue).map(key=>`${key}`).join(',')+' you provided '+(Object.keys(err.keyValue).length>1?'are':'is')+' already taken';
        customError.statusCode=StatusCodes.BAD_REQUEST
    }
    if(err.name==='CastError'){
        customError.message=`no item found with the id : ${err.value}`;
        customError.statusCode=StatusCodes.NOT_FOUND;
    }
    res.status(customError.statusCode).json({error:true,msg:customError.message})
}

module.exports=errorHandlerMiddleware