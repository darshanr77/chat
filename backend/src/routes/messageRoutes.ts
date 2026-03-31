import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { Message } from "../models/Message";
import { Chat } from "../models/Chat";


const router = Router();

router.get("/chat/:chatId",protectRoute,)

export default router;