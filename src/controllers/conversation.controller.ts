import { Request, Response } from "express";
import { Conversation } from "../models/Conversations";

export const createOrGetConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).userId;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        message: "receiverId is required",
      });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    if (!conversation) {
      // Create new conversation
      conversation = await Conversation.create({
        participants: [userId, receiverId],
      });
    }

    return res.json({
      conversationId: conversation._id,
      participants: conversation.participants,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
