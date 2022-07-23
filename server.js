require('dotenv').config();
require('express-async-errors');

const express=require('express');
const { StatusCodes } = require('http-status-codes');

const morgan=require('morgan');
const startServer = require('./start-server');

const app=express();

const port =process.env.PORT||3000;


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.status(StatusCodes.OK).json({msg:'welcome'})
})



startServer(app,port);

