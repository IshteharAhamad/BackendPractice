import express from "express";
import fs from "fs"
import status from "express-status-monitor"
import zlib from "zlib";
const app=express();
const PORT=8000;
app.use(status())
fs.createReadStream('./sample.txt')
  .pipe(zlib.createGzip())  // Call zlib.createGzip as a function
  .pipe(fs.createWriteStream('./sample.zip'));
app.get("/", (req,res)=>{
    const stream=fs.createReadStream("./sample.txt","utf8");
    stream.on("data",(chunk)=>{
        res.write(chunk);
    })
    stream.on("end",()=>res.end());
    // fs.readFile("./sample.txt",(err,data)=>{
    //     res.end(data)
    // })
});
app.listen(PORT,()=>{
    console.log(`Application is running on ${PORT}`);
})
