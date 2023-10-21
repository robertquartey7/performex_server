import { User } from "../models/user.js";

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
// GET ONE USER
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      mesage: "Something went wrong",
    });
  }
};
// UPDATE A USER
export const updateUser = async (req, res) => {
  try {
    const user = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
      }
    );

    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
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

// DELETE All USERS
export const deleteUsers = async (req, res) => {
  try {
    const deletedUser = await User.deleteMany();

    if (deletedUser) {
      res.status(200).json({
        message: deletedUser,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* DELETE A USER */
export const deleteOneUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({
      _id: req.params.id,
    });

    if (deletedUser) {
      res.status(200).json({
        message: deletedUser,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



