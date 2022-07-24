const { AuthenticationError, AuthorizationError } = require("../errors");
const { verifyJWT } = require("../utils");



const authenticateUser=(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        throw new AuthenticationError('Authentication invalid')
    }
    try{
        const decoded=verifyJWT({token});
        const {name,userId,role}=decoded;
        req.user={name,userId,role};
        next();


    }
    catch(err){
        console.log(err);
        throw new AuthenticationError('authentication invalid')
    }
}

const authorizePermissions=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new AuthorizationError('unauthorized to access this route');
        }
        next();
    }
}


module.exports={authorizePermissions,authenticateUser};