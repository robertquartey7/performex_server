import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";
import cors from "cors";
export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Replace with your frontend's origin
    methods: ["GET", "POST", "OPTIONS"], // Add any other HTTP methods your app uses
    allowedHeaders: ["Content-Type", "Authorization"], // Add headers your app sends
  })
);

/* MONGOOSE SETUP && CONNECTING TO MONGODB DATABASE*/
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("connection failed");
  });

/* SETTING UP JWT STRATEGY */
setupJWTStrategy(passport);

// API ROUTES
app.use("/api", morgan("tiny"));
app.use("/api", authRoutes);
app.use("/api", userRoutes);



app.get("/", (req, res) => {
  res.send("hello world");
});
