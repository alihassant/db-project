const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const io = require("../socket");

const User = require("../models/user");
const Post = require("../models/postData");
const Database = require("../models/database");
const Notification = require("../models/notification");

// cloudinary setup
cloudinary.config({
  cloud_name: "davfhdzxx",
  api_key: "336338634814583",
  api_secret: "QYUCawOjsAezotGCgtQktTXZfao",
});

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

// user setting
exports.editUser = async (req, res, next) => {
  const { userId, name, email, oldPassword, newPassword } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessageStatus("Validation failed, entered data is incorrect.", 422);
  }
  try {
    const user = await User.findById(userId);

    if (!user) {
      errorMessageStatus("Could not find user.", 404);
    }
    if (user._id.toString() !== userId) {
      errorMessageStatus("Not authorized!", 403);
    }

    const otherUser = await User.findOne({ email });
    if (otherUser) {
      errorMessageStatus("Email address already exists, try again!!!", 403);
    }

    const isEqual = await bcrypt.compare(oldPassword, user.password);
    if (!isEqual) {
      const error = new Error("Old password is wrong, try again!!!");
      error.statusCode = 401;
      throw error;
    }

    const hashedPw = await bcrypt.hash(newPassword, 12);

    user.name = name;
    user.email = email;
    user.password = hashedPw;

    const result = await user.save();
    res.status(200).json({
      message: "User Updated Successfully!!!",
      result,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// users posts for their profile
exports.userPosts = async (req, res, next) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      errorMessageStatus("No user ID found. Please try again later!", 500);
    }
    const posts = await Post.find({ creator: userId });

    if (posts.length <= 0) {
      errorMessageStatus("Could not find any post.", 404);
    }

    res.status(200).json({
      message: "User's Posts Found Successfully!!!",
      posts,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// getting/showing the databases the user is in
exports.getDatabases = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("databases.dbId");
    const dbs = user.databases;
    if (dbs.length === 0) {
      errorMessageStatus("No Database Found!!!", 404);
    }
    res.status(200).json({
      message: "Databases Fetched Successfully!!!",
      dbs,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getDatabase = async (req, res, next) => {
  const { dbId } = req.params;
  try {
    const db = await Database.findById(dbId).populate("posts");
    if (!db) {
      errorMessageStatus("No Database Found!!!", 404);
    }
    res.status(200).json({
      message: "Database Fetched Successfully!!!",
      db,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// edit user's details
exports.editUserDetails = async (req, res, next) => {
  const { userId, name, email: emailBody, username: usernameBody } = req.body;

  try {
    const email = emailBody.toLowerCase();
    const username = usernameBody.toLowerCase();

    const user = await User.findById(userId);
    if (!user) {
      errorMessageStatus("Could not find user.", 404);
    }

    const checkEmail = await User.findOne({ email });
    if (email !== user.email && checkEmail) {
      errorMessageStatus("Email address already exists, try again!!!", 403);
    }

    const checkUsername = await User.findOne({ username });
    if (username !== user.username && checkUsername) {
      errorMessageStatus("Username already exists, try again!!!", 403);
    }

    user.name = name;
    user.email = email;
    user.username = username;

    const result = await user.save();

    res.status(200).json({
      message: "User Updated Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// edit user password
exports.editUserPassword = async (req, res, next) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      errorMessageStatus("Could not find user.", 404);
    }

    const isEqual = await bcrypt.compare(oldPassword, user.password);

    if (!isEqual) {
      const error = new Error("Old password is wrong, try again!!!");
      error.statusCode = 401;
      throw error;
    }

    const hashedPw = await bcrypt.hash(newPassword, 12);
    user.password = hashedPw;

    const result = await user.save();
    res.status(200).json({
      message: "User Password Updated Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// edit user about
exports.editAbout = async (req, res, next) => {
  const { userId, about } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      errorMessageStatus("Could not find user.", 404);
    }
    user.about = about;
    const result = await user.save();
    res.status(200).json({
      message: "About Updated Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// change user profile picture
exports.changeProfilePic = async (req, res, next) => {
  const { userId, profilePic } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      errorMessageStatus("Could not find user.", 404);
    }
    await cloudinary.v2.uploader.destroy(user.profilePic.publicId);
    user.profilePic = profilePic;
    const result = await user.save();
    res.status(200).json({
      message: "Profile Picture Updated Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// get user notifications
exports.getNotifications = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId });
    if (notifications.length === 0) {
      errorMessageStatus("No Notifications Found!!!", 404);
    }

    res.status(200).json({
      message: "Notifications Fetched Successfully!!!",
      notifications,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};
