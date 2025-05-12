import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Enable CORS and allow requests from any origin
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Define the schema and model for User
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

//sign in
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Log the sign-in request
  console.log(`Received sign-in request: ${email}`);

  const user = await User.findOne({ email });

  if (!user) {
    // If the user is not found, respond with a 404 status
    console.log('User not found');
    return res.status(404).json({ message: "User not found. Please sign up." });
  }

  // Compare the entered password with the stored hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    // If the password does not match, respond with a 401 status
    console.log('Incorrect password');
    return res.status(401).json({ message: "Incorrect password" });
  }

  // If login is successful, send a success message
  res.json({ message: "Login successful" });
});


// Handle user sign-up
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Log the sign-up request
  console.log(`Received sign-up request: ${email}`);

  // Check if the user already exists
  const exists = await User.findOne({ email });

  if (exists) {
    // If the user already exists, respond with a 400 status
    return res.status(400).json({ message: "User already exists. Please sign in." });
  }

  // Hash the password before saving
  const hashed = await bcrypt.hash(password, 10);

  // Create a new user and save it to the database
  const newUser = new User({ email, password: hashed });
  await newUser.save();

  // Send a success message
  res.json({ message: "User created successfully" });
});

// Start the server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});