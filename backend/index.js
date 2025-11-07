const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb+srv://Thomas:Thomas%401234@cluster0.0qicwfg.mongodb.net/appstore?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// ✅ SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    console.log("✅ New user registered:", username);
    res.json({ message: "Signup successful", username });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// ✅ LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    res.json({ message: "Login successful", username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ✅ Home Route
app.get("/", (req, res) => {
  res.send("🚀 App Store Backend Running with MongoDB!");
});
import App from "./models/App.js"; // add this at the top

// GET all apps or filter by category
app.get("/api/apps", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const apps = await App.find(filter);
    res.json(apps);
  } catch (error) {
    console.error("Error fetching apps:", error);
    res.status(500).json({ message: "Failed to fetch apps" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
