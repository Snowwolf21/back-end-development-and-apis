import express from "express";
import helmet from "helmet";
import session from "express-session";
import watchlistRoutes from "./routes/routes.js";
import {generateToken, findByUsername} from "./utils/db.js";
import {authenticate}from "./middleware/authenticate.js";
import { verifyPassword } from "./utils/helper.js";
const PORT = process.env.PORT;
const app = express();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 // 1 hour
   }
}));

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  // Add login logic here
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (!username.trim() || !password.trim()) {
    return res.status(401).json({ error: "Username or password are required" });
  }
  const user = findByUsername(username);

   if (!user || !(await verifyPassword(user, password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  // For demonstration purposes, we will just return a dummy token
  const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role
  });
  res.status(200).json({ token });
});

app.use("/api/watchlist",
  authenticate,
  watchlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
