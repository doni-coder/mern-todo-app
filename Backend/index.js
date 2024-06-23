import { app } from "./src/app.js";
import { connectDB } from "./src/Database/index.js";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})

connectDB().then(()=>{
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("Error connecting to database",error);
})