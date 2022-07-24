
const express=require('express');
const { loginUser, logoutUser, registerUser } = require('../controller/authController');

const authRouter=express.Router();




authRouter.route('/login').post(loginUser)
authRouter.route('/logout').post(logoutUser)
authRouter.route('/register').post(registerUser)



module.exports=authRouter;