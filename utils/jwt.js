const jwt=require('jsonwebtoken');
const date = require('date-and-time');




const createJWT=({payload})=>{

    const token =jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:process.env.KEY_LIFETIME})
    return token;
}




const verifyJWT=({token})=>jwt.verify(token,process.env.SECRET_KEY);



const setResponseCookies=({res,payload})=>{
    const token=createJWT({payload});
    const now = new Date();
    const cookieExpireDate = date.addDays(now,30);
    res.cookie('token',token,{httpOnly:true,expires:cookieExpireDate})
}



module.exports={verifyJWT,createJWT,setResponseCookies};
