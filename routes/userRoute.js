const express=require('express');
const { getAllUsers, getSingleUser, updateUserPassword, updateUser, showCurrentUser } = require('../controller/userController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');


const userRouter=express.Router();


userRouter.route('/').get(authenticateUser,authorizePermissions('admin'),getAllUsers);


userRouter.route('/show-current-user').get(showCurrentUser);

userRouter.route('/update-password').patch(updateUserPassword);

userRouter.route('/update-user').patch(updateUser);



userRouter.route('/:id').get(getSingleUser)


module.exports=userRouter;

