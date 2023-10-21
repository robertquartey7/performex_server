import { User } from "../models/user.js";

export async function checkForUser(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        message: `an Account assoicated with this email exists`,
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
}
