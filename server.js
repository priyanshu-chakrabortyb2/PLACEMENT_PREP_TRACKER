require("dotenv").config();
const express=require("express");
const connectDB=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const authMiddleware=require("./middleware/auth");
const taskRoutes=require("./routes/taskRoutes");
const limiter=require("./middleware/rateLimiter");
const errorHandler=require("./middleware/errorHandler");
const cors=require("cors");
const app = express();


// Middleware to read JSON requests
app.use(express.json());

// Connect MongoDB
connectDB();


//Rate limiter
app.use(limiter);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks",taskRoutes);



//Error Handler
app.use(errorHandler);


//Connect frontend
app.use(cors());
// Protected test route
app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to your profile",
    user: req.user
  });
});


// Default route
app.get("/", (req, res) => {
  res.send("Server running successfully 🚀");
});


// Start server
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});