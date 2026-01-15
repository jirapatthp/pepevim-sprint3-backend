import { normalize, validateRegister } from "../../utils/validate.js";
import User from "./users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../utils/env.js";

const isProd = env.NODE_ENV === "production";

export const createUser = async (req, res) => {
  try {
    // 1️⃣ validate input
    const errorMessage = validateRegister(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const firstName = normalize(req.body.first_name);
    const lastName = normalize(req.body.last_name);
    const email = normalize(req.body.email).toLowerCase();
    const password = req.body.password;

    // 2️⃣ check email duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 3️⃣ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ create user
    const newUser = new User({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully 🧽🎀",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Register error📕🍄" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials." });

    const token = await jwt.sign({ userId: user._id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({ message: "🎀login success" });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: "Server Login error🍡🐟" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
  return res.status(200).json({ message: "Logout success" });
};
