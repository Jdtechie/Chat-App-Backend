import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4️⃣ Save user
    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    // 5️⃣ Send response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
  
      // Compare password
      const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
      );
  
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
  
      // Send response
      return res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
export const getAllUsers = async (req: Request, res: Response) => {
    try {
  
      // Find user
      const users = await User.find({}, { name: 1, _id: 0 });
      if (!users) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      // Send response
      return res.status(201).json({
        message: "All User Fetched Successfully",
        All_Users: users
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  };