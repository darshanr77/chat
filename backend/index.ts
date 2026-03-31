import app from "./src/app";
import { connectDB } from "./src/config/database";
import {createServer} from 'http'


const PORT = process.env.PORT || 3000;
const HttpServer =  createServer(app);

initializeSocket(HttpServer)

connectDB()
    .then(()=>{
        app.listen(PORT,()=>{
        console.log("Server is live on  PORT",PORT);
    });
   })
    .catch((error)=>{
        console.log("Failed to start the server ",error);
        process.exit(1);
    })
