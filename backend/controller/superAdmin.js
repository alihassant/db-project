const { validationResult } = require("express-validator");

const User = require("../models/user");
const Database = require("../models/database");
const Post = require("../models/postData");

const generalPromiseError = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
};

const errorMessageStatus = (errorMessage, errorStatusCode) => {
  const error = new Error(errorMessage);
  error.statusCode = errorStatusCode;
  throw error;
};

exports.getAllUsers = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const checkAdmin = await User.findById(userId);
    if (checkAdmin.extraRole !== "superAdmin") {
      errorMessageStatus(
        "You are not authorized to perform this function.",
        403
      );
    }
    const users = await User.find();
    res.status(200).json({
      message: "All Users Fetched Successfully!!!",
      users,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getUsersNumber = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const checkAdmin = await User.findById(userId);
    if (checkAdmin.extraRole !== "superAdmin") {
      errorMessageStatus(
        "You are not authorized to perform this function.",
        403
      );
    }
    const users = await User.find();
    const usersNumber = users.length;

    const databases = await Database.find();
    const dbNumber = databases.length;

    res.status(200).json({
      message: "All Users Fetched Successfully!!!",
      usersNumber,
      dbNumber,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { email, userId } = req.body;
  try {
    const checkAdmin = await User.findById(userId);
    if (checkAdmin.extraRole !== "superAdmin") {
      errorMessageStatus(
        "You are not authorized to perform this function.",
        403
      );
    }
    await User.findOneAndDelete({ email });
    res.status(200).json({
      message: "User Deleted Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getDatabases = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const checkAdmin = await User.findById(userId);
    if (checkAdmin.extraRole !== "superAdmin") {
      errorMessageStatus(
        "You are not authorized to perform this function.",
        403
      );
    }
    const databases = await Database.find();

    res.status(200).json({
      message: "All Databases Fetched Successfully!!!",
      databases,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getPostsNumber = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const checkAdmin = await User.findById(userId);
    if (checkAdmin.extraRole !== "superAdmin") {
      errorMessageStatus(
        "You are not authorized to perform this function.",
        403
      );
    }
    const posts = await Post.find();
    const postsNumber = posts.length;

    res.status(200).json({
      message: "Posts Number Fetched Successfully!!!",
      postsNumber,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// exports.getDatabasesNumber = async (req, res, next) => {
//   const { userId } = req.body;
//   try {
//     const checkAdmin = await User.findById(userId);
//     if (checkAdmin.extraRole !== "superAdmin") {
//       errorMessageStatus(
//         "You are not authorized to perform this function.",
//         403
//       );
//     }
//     const databases = await Database.find();
//     const databasesNumber = databases.length;

//     res.status(200).json({
//       message: "All Databases Fetched Successfully!!!",
//       databasesNumber,
//     });
//   } catch (err) {
//     generalPromiseError(err);
//     next(err);
//   }
// };
