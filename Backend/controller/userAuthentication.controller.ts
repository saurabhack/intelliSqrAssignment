import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../DB/db.config";
import jwt from "jsonwebtoken";
import { userSchema } from "../schemaValidation/userSchema";


export async function registerUser(req: Request, res: Response) {
    try {
        // Validate user input
        const validationResult = userSchema.safeParse(req.body);
        if (!validationResult.success) {
             res.status(400).json({ success: false, message: validationResult.error });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
             res.status(400).json({ success: false, message: "Email already in use" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || "saurabh", { expiresIn: "7d" });

        // Set cookie with token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

         res.status(201).json({ success: true, message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error in registerUser:", error);
         res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided if do not provide it will return message
        if (!email || !password) {
             res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find user with the help of email 
        const findUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!findUser || !findUser.password) {
             res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // compare user provided password and stored password
        const isMatch = await bcrypt.compare(password, findUser?.password as string);
        if (!isMatch) {
             res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: findUser?.id }, process.env.JWT_SECRET || "saurabh", { expiresIn: "7d" });

        // Set cookie with token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

         res.status(200).json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("Error in login:", error);
         res.status(500).json({ success: false, message: "Internal server error" });
    }
}