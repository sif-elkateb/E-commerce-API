
const createJWTPayload=({user})=>{
    const payload={name:user.name,userId:user._id,role:user.role};
    return payload

}


module.exports=createJWTPayload;