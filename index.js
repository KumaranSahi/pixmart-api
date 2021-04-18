const express=require('express');
const PORT=8000;

const router=require('./Router')
const db=require('./Config/Mongoose')

const app=express()

app.use("/api",router);

app.use("/",(req,res)=>{
    return res.status(404).json({
        data:"Requested data doesn't exist"
    })
})

app.listen(PORT,()=>console.log("Server running on port "+PORT))