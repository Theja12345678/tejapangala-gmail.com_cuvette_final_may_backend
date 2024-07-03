const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser=require("cookie-parser")
const errorHandler= require("./middleware/errorHandler")

//EXPRESS
const app = express();
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//CORS
const cors = require('cors');
app.use(cors());

app.use(cookieParser());

//Connect TO MONGODB
const HOST= process.env.HOST||"localhost";
const PORT=process.env.PORT||3002;
mongoose.connect(process.env.MONGODB_URI)
.then(() =>console.log("Connected to DB"))
.catch(()=>console.log(" failed Connected to DB"))

//default api
app.get("/", (_, res)=> {
    res.status(200).json({
        status: "active",
        service: "Pro Manage Backend",
        time: new Date(),
    })
})

//ROUTES
const authRoutes = require('./routes/authRoute');
const taskRoutes=require('./routes/taskRoute')
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/task', taskRoutes);



//Error Handler Middleware
app.use(errorHandler)


app.listen(PORT,()=>{
  console.log(`server is up and running on port: http://${HOST}:${PORT}`);
})
