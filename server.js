require('dotenv').config();
require('express-async-errors');

const express=require('express');
const { StatusCodes } = require('http-status-codes');

const morgan=require('morgan');

const cookieParser=require('cookie-parser');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundHandlerMiddleware = require('./middleware/not-found');
const userRouter = require('./routes/authRoute');
const startServer = require('./start-server');

const app=express();

const port =process.env.PORT||3000;


//middleware
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))


app.get('/',(req,res)=>{
    console.log(req.cookies)
    res.status(StatusCodes.OK).json({msg:'welcome'})
})


app.use('/api/v1/auth',userRouter);

app.use(notFoundHandlerMiddleware);

app.use(errorHandlerMiddleware);



startServer(app,port);

