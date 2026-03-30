import express from 'express'
import authRoutes from './routes/authRoutes.ts'
import messageRoutes from './routes/messageRoutes.ts'
import chatRoutes from './routes/chatRoutes.ts'
import userRoutes from './routes/userRoutes.ts'

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());  //“If the request body contains JSON, parse it and make it usable in req.body”

app.get("/",(req,res)=>{
    res.send({status:"ok",message:"server main page is working"});
})

app.get("/api/auth",authRoutes);
app.get("/api/chat",chatRoutes);
app.get("/api/messages",messageRoutes);
app.get("/api/users",userRoutes);

export default app;