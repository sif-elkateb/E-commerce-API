const connectDB = require("./db/connectDB");




const startServer=async(app,port)=>{
    try{
        await connectDB();
        console.log('connected to DB');
        app.listen(port,console.log(`server started listening at port ${port}`))

    }
    catch(err){
        console.log(err);
    }
}


module.exports=startServer;