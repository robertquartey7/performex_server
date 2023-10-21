import { User } from "../models/user.js";


/* VERIFICATION ON THE RESET PASSWORD TOKEN */
const verifyResetPasswordToken = async (req, res, next) => {
  try {
    const token = req.params.token;

    /* FIND USER WITH TOKEN */
    const foundUser = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!foundUser) {
      res.status(400).json({
        message: "Token has expired",
      });
    }
    next();
  } catch (error) {
    
    res.status(500).json({
      message: error.message,
    });
  }
};
