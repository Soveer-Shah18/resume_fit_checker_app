const express = require("express")
const app = express();
const healthRoute = require('./routes/health.routes');
const resumeRoute = require('./routes/resume.routes');
require('dotenv').config({path: '../.env' });
const cors = require('cors')


app.use(cors({
    origin: ['http://localhost:5173',
        process.env.CLIENT_URL
    ],
    credentials: true
}))


app.use(express.json());

app.use('/health',healthRoute);
app.use('/resume',resumeRoute);


const InitalizeConnection = async ()=>{
    try{

        app.listen(process.env.PORT,()=>{
            console.log("Server Listening at port "+ process.env.PORT);
        })
    }
    catch(err){
        console.log("Error: "+ err);
    }
}

InitalizeConnection();