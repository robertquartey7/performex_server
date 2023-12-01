import dotenv from "dotenv";
dotenv.config();
import { mailOptions, transporter } from "../libs/emailConfig.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/* Sign up new users */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      email,
      password: hashPassword,
      is_active: true,
    });

    if (user) {
      /* SENDING AN EMAIL WITH THE VERIFICATION LINK */
      const verificationLink = `${process.env.FRONTEND_URL}/verify`;
      const emailText = `
      <p>Hello,</p>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationLink}" >Verify</a>
      <p>If you didn't request this verification, please ignore this email.</p>
    `;

      const verificationEmail = transporter.sendMail(
        mailOptions(emailText, "Email Verification", user.email),
        (err, success) => {
          if (err) {
            console.log(err.message);
          }
        }
      );

      delete user.password;
      return res.status(201).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* logging in a user */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (user) {
      /* COMPARE PASSWORD */
      const comparedPassword = bcrypt.compareSync(password, user.password);
      if (comparedPassword) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.SECRET_KEY
        );

        res.status(200).json({
          accessToken: token,
          id: user._id,
        });
      } else {
        res.status().json({
          message: "wrong password!!!",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

/*  */
