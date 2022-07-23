const jwt=require('jsonwebtoken');



const createJWT=({payload})=>{

    const token =jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:process.env.KEY_LIFETIME})
    return token;
}




const verifyJWT=({token})=>jwt.verify(token,process.env.SECRET_KEY);



module.exports={verifyJWT,createJWT};
