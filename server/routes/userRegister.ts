import mongoose from "mongoose";
import UserModel from "../models/userDb";
import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcryptjs";
import { z } from "zod";

const userDetailsSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must of the minimum 5 characters long" }),
  userEmail: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be of minimum 6 character" }),
});

class userRegistration {
  private userDetails = userDetailsSchema;

  private userDataValidation(data: any) {
    return this.userDetails.safeParse(data);
  }

  private hashingPassword(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  private async creatingUser(data: {
    username: string;
    userEmail: string;
    password: string;
  }) {
    const { username, userEmail, password } = data;
    const hashedpassword = this.hashingPassword(password);
    const newUser = new UserModel({
      username,
      userEmail,
      password: hashedpassword,
      subscription: "free",
      createdAt: new Date(),
    });

    return newUser.save();
  }

  public async registerUser(req: Request, res: Response) {
    try {
      const validationResult = this.userDataValidation(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error.errors });
      }
      const { username, userEmail, password } = validationResult.data;

      await this.creatingUser(validationResult.data);
      console.log("User created successfully");
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

export default new userRegistration();
