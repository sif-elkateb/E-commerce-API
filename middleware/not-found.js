const { StatusCodes } = require("http-status-codes")



const notFoundHandlerMiddleware=(req,res,next)=>{
    res.status(StatusCodes.NOT_FOUND).json({msg:'the route you are looking for is not found'})
}



module.exports=notFoundHandlerMiddleware;