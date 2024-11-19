import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import PostRouter from './routes/Posts.js'
import GenerateImageRouter from './routes/GenerateImage.js'


dotenv.config();

const app=express();


app.use(cors());


app.use(express.json({limit:"50mb"}));

app.use(express.urlencoded({extended:true}));

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});


app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);


app.get("/", async (req, res) => {
    res.status(200).json({
      message: "Hello  Developers!",
    });
});




const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const Connection= async ()=>{
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hknnkzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    //deepu:deepu%40123@cluster0.hknnkzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    try{
        await mongoose.connect(URL,{useunifiedTopology:true})
        console.log("database connected successfully")
    }catch(error){
        console.log("database not connected successfully",error.message);
    }
}


const startServer = async () => {
    try {
        Connection();
        app.listen(8080, () => console.log("Server started on port 8080"));
    } catch (error) {
        console.log(error);
    }
    };

startServer();

