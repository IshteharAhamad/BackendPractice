import dotenv from "dotenv"
import connect_DB from "./configureDB/index.db.js"
import { app } from "./app.js"
dotenv.config({
    path: './.env'
})
connect_DB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(`connection failed`,error);
})  