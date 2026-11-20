const mongoose = require("mongoose")
require ("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./Routers/auth"));
mongoose .connect(process.env.MONGO_URL)
.then(() => {
    console.log("mongodb running succesfully");
})
.catch((err) =>{
    console.log("Mongodb not connected",err)
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})

const userRouter = require("./Routers/auth");
app.use("/api/users,userRouter");
