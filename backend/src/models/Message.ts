import mongoose , {type Document , Schema} from "mongoose";


export interface IMessage extends Document {
    chat:mongoose.Types.ObjectId;
    sender:mongoose.Types.ObjectId;
    text:String;
    createdAt:Date;
    updatedAt:Date;
}

const MessageSchema = new Schema<IMessage> ({
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat",
        required:true,
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    text:{
        type:String,
        required:true,
        trim:true
    },

} , {timestamps : true});

MessageSchema.index({chat : 1 , createdAt : 1});
// 1 -> ascending order of chat in time means older chats will be shown first
// -1 -> descending

export const Message = mongoose.model("Message",MessageSchema);