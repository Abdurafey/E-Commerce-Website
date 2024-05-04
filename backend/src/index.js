import app from "./app.js"
import connectDB from "./db/index.js"
import dotenv from 'dotenv'

dotenv.config({})

const port = process.env.PORT || 5000;
connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`📔 Server is running at port : ${port}`);
        // app.on("error", (error)=>{
        //     console.log("ERRR:", error);
        //     throw error;
        // })
    })
})
.catch((error)=>{
    console.log("MONGO db connection failed!!", error);
})