import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { Types } from "mongoose";

export async function getChats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;

        const chats = await Chat.find({ participants: userId })
            .populate("participants", "name email avatar")
            .populate("lastMessage") // fixed typo
            .sort({ lastMessageAt: -1 }); // fixed field

        const formattedChats = chats.map((chat) => {
            const otherParticipants = chat.participants.find(
                (p: any) => p._id.toString() !== userId
            );

            return {
                _id: chat._id,
                participant: otherParticipants ?? null,
                lastMessage: chat.lastMessage,
                lastMessageAt: chat.lastMessageAt, // fixed typo
                createdAt: chat.createdAt, // fixed (was Chat.createdAt)
            };
        });

        res.json(formattedChats);

    } catch (error) {
        res.status(500);
        next(error);
    }
}

export async function getOrCreateChat(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const { participantId } = req.params;

        if(!participantId){
            res.status(400).json({message:"participant is is required"});
            return;
        }

        if(!Types.ObjectId.isValid(participantId)){
            return res.status(400).json({message:"invalid participant id"});
        }
        if(userId === participantId){
            res.status(400).json({message:"You cannot create a chat with your self"});
                return;
        }

        // if chat already exists
        let chat = await Chat.findOne({
            participants: { $all: [userId, participantId] },
        })
            .populate("participants", "name email avatar")
            .populate("lastMessage"); // fixed typo

        if (!chat) {
            const newChat = new Chat({ participants: [participantId, userId] });
            await newChat.save();
            chat = await newChat.populate("participants", "name email avatar");
        }

        const otherParticipant = chat.participants.find(
            (p: any) => p._id.toString() !== userId
        );

        return res.json({ // fixed: was returning instead of sending response
            _id: chat._id,
            participant: otherParticipant ?? null,
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt, // fixed typo
            createdAt: chat.createdAt,
        });

    } catch (error) {
        res.status(500);
        next(error);
    }
}