import cluster from "cluster";
import express from "express";
import os from "os"
 const app=express()
 const PORT=8000;
 const totalcpu=os.cpus().length
 if(cluster.isPrimary){
    for(let i=0;i<=totalcpu;i++){
        cluster.fork();
    }
 }else{

     app.get("/",(req,res)=>{
       return res.json({message:`process express ${process.pid}`})
     })
     app.listen(PORT,()=>{
       console.log(`${PORT}`)
     })
 }
 //9051/9052