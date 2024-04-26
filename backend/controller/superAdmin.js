const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const io = require("../socket");

const User = require("../models/user");
const Post = require("../models/postData");
const Database = require("../models/database");
const Notification = require("../models/notification");
const ToDo = require("../models/toDos");

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
  const { userId } = req;
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
  const { userId } = req;
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

exports.getUserDetails = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      errorMessageStatus("No User Found!!!", 404);
    }
    res.status(200).json({
      message: "User Details Fetched Successfully!!!",
      user,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.changeUserDetails = async (req, res, next) => {
  const { userId, email, name, username, extraRole, currentPlan } = req.body;
  try {
    const user = await User.findById(userId);
    user.email = email;
    user.name = name;
    user.username = username;
    user.extraRole = extraRole;
    user.currentPlan = currentPlan;
    await user.save();

    // creating a new notification for the user
    const notification = new Notification({
      userId,
      message: "Your profile details have been updated by an admin.",
    });
    await notification.save();

    // Emit Socket.IO notification to the user
    io.emitToUser(userId, "notification", {
      action: "update",
      message: "Your profile details have been updated by an admin.",
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({
      message: "User Details Changed Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.changeUserPassword = async (req, res, next) => {
  const { userId, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    // creating a new notification for the user
    const notification = new Notification({
      userId,
      message: "Your password has been updated by an admin.",
    });
    await notification.save();

    // Emit Socket.IO notification to the user
    io.emitToUser(userId, "notification", {
      action: "update",
      message: "Your password has been updated by an admin.",
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({
      message: "Password Changed Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getUserDatabase = async (req, res, next) => {
  const { dbId } = req.params;
  try {
    const db = await Database.findById(dbId);
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

exports.changeTableHeaders = async (req, res, next) => {
  const { dbId, ownerId, totalHeaders, ...tableHeaders } = req.body;
  try {
    const db = await Database.findById(dbId);
    if (!db) {
      errorMessageStatus("No Database Found!!!", 404);
    }
    db.totalHeaders = totalHeaders;
    db.tHeaders = tableHeaders;
    await db.save();

    // creating a new notification for the owner
    const notification = new Notification({
      userId: ownerId,
      message: `Your Database ${db.name}'s headers have been updated by an admin.`,
    });
    await notification.save();

    // Emit Socket.IO notification to the user
    io.emitToUser(ownerId, "notification", {
      action: "update",
      message: `Your Database ${db.name}'s headers have been updated by an admin.`,
      dbId,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({
      message: "Table Headers Changed Successfully!!!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.changeTableDetails = async (req, res, next) => {
  const { dbId, ownerId, name, media, notifications, emails } = req.body;
  try {
    const db = await Database.findById(dbId);
    if (!db) {
      errorMessageStatus("No Database Found!!!", 404);
    }
    db.name = name;
    db.media = media;
    db.notifications = notifications;
    db.emails = emails;
    await db.save();

    // creating a new notification for the owner
    const notification = new Notification({
      userId: ownerId,
      message: `Your Database ${name}'s details have been updated by an admin.`,
    });
    await notification.save();

    // Emit Socket.IO notification to the user
    io.emitToUser(ownerId, "notification", {
      action: "update",
      message: `Your Database ${name}'s details have been updated by an admin.`,
      dbId,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({
      message: "Table Details Changed Successfully!!!",
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
