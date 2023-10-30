import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import authRoutes from './routes/authentication.js'
import userRoutes from './routes/user.js'
import { environment } from "./libs/environmentConfig.js";
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
  .connect(environment.DB_URL, {
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
app.use(environment.API_URL, morgan("tiny"));
app.use(environment.API_URL, authRoutes);
app.use(environment.API_URL, userRoutes);



app.get("/", (req, res) => {
  res.send("hello world");
});
