import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./DB/connectDB.js";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-mern-app-client.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is Running On http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database.");
  }
};

startServer();
