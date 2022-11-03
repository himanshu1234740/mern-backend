
import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/router.js";
const app = express();

// setting up the body parser 

app.use(bodyParser.json({limit: '30mb',extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb',extended: true}))
app.use('/upload',express.static('upload'))
app.use('/profile',express.static('profile'))
app.use('/frontend',express.static('frontend'))
//file uploader


// setting cores 
app.use(cors())

//import router here 
app.use('/posts',postRoutes)
//static file on heroku
if(process.env.NODE_ENV === 'production'){
    app.use(express.static("frontend/build"))
}

//connect to the database
const CONNECTION_STRING = 'mongodb+srv://himanshu:himanshukumar@cluster0.1cz1luu.mongodb.net/test';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_STRING).then(()=>{ 
    app.listen(PORT,()=>{
        console.log(`listion on port ${PORT}`);
        
    });
}).catch(err=>{
    console.error(err)
})

