require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Check if JWT secret is loaded
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`ClientTrack server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();