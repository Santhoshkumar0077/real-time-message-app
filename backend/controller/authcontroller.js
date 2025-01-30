import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Conversation from "../models/Conversation.js";

// User signup
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ message: "User created successfully", accessToken: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
      "-password"
    );
    const loggeduserid = req.user.id;
    const loggedusername = req.user.username;
    res.json({ users, loggeduserid, loggedusername });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const createOrFindConversation = async (req, res) => {
  try {
    const { loggeduserid, selecteduserid } = req.body;

    if (!loggeduserid || !selecteduserid) {
      return res.status(400).json({ message: "User IDs are required" });
    }

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [loggeduserid, selecteduserid] },
    });

    // Create a new conversation if none exists
    if (!conversation) {
      conversation = new Conversation({
        participants: [loggeduserid, selecteduserid],
        messages: [],
      });

      await conversation.save();
      return res.status(200).json(conversation);
    }

    return res.status(200).json(conversation);
  } catch (error) {}
};
export const messagesPushing = async (req, res) => {
  try {
    const { selecteduserid, loggeduserid, input } = req.body;
    const existingconversation = await Conversation.findOne({
      participants: { $all: [loggeduserid, selecteduserid] },
    });

    if (!existingconversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    const newMessage = {
      input,
      loggeduserid,
      createdAt: Date.now(),
    };

    existingconversation.messages.push(newMessage);
    await existingconversation.save();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
