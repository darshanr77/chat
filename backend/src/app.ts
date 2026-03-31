import express from 'express'
import path from 'path'
import authRoutes from './routes/authRoutes.ts'
import messageRoutes from './routes/messageRoutes.ts'
import chatRoutes from './routes/chatRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from './middleware/errorHandler.ts'


const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());  //“If the request body contains JSON, parse it and make it usable in req.body”
app.use(clerkMiddleware())


app.get("/",(req,res)=>{
    res.send({status:"ok",message:"server main page is working"});
})

app.get("/api/auth",authRoutes);
app.get("/api/chat",chatRoutes);
app.get("/api/messages",messageRoutes);
app.get("/api/users",userRoutes);

app.use(errorHandler);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../../web/dist")));

    app.get("/{*any",(_,res)=>{
        res.sendFile(path.join(__dirname,"../../web/dist/index.html"));
    })
}

export default app;