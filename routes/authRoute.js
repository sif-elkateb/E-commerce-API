
const express=require('express');
const { loginUser, logoutUser, registerUser } = require('../controller/authController');

const userRouter=express.Router();




userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(logoutUser)
userRouter.route('/register').post(registerUser)



module.exports=userRouter;