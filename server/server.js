import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRoute);
app.use("/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running On http://localhost:${process.env.PORT}`);
});
