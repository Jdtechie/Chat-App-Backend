import { Request, Response } from "express";
import { Message } from "../models/Message";
import { Conversation } from "../models/Conversations";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const senderId = (req as any).userId;
    const { conversationId, text } = req.body;

    if (!conversationId || !text) {
      return res.status(400).json({
        message: "conversationId and text are required",
      });
    }

    // Create message
    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
    });

    //  Update lastMessage in conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
    });

    return res.status(201).json({
      message: "Message sent",
      data: message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};


export const getMessagesByConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        message: "conversationId is required",
      });
    }

    const messages = await Message.find({
      conversation: conversationId,
    })
      .sort({ createdAt: 1 }) // oldest → newest
      .populate("sender", "name email");

    return res.json({
      messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
