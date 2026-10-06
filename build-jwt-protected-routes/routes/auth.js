import express from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { findByEmail, readUsers, writeUsers } from "../utils/db.js";
import { signToken } from "../utils/jwt.js";
import authenticate from "../middleware/authenticate.js";
import { blacklistToken } from "../utils/token-blacklist.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (findByEmail(email)) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const users = readUsers();
    const newUser = {
      id: randomUUID(),
      email,
      passwordHash,
      role: "user",
    };

    users.push(newUser);
    writeUsers(users);

    const token = signToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  } 
  // Find the user by email
  const user = findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Check if the password is correct
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = signToken({ id: user.id, email: user.email });

  res.json({ token });
});

router.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
router.post('/logout', authenticate, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  blacklistToken(token);
  res.json({ message: 'Logged out successfully' });
});
router.get('/admin', authenticate, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json({ message: 'Welcome, admin!' });
});

export default router;