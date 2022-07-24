const { StatusCodes } = require("http-status-codes");


const CustomError = require("./custom-error");

class AuthorizationError extends CustomError {
    constructor(message){
        super(message);
        this.statusCode=StatusCodes.FORBIDDEN
        
    }
}


module.exports=AuthorizationError