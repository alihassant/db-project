const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary");
const io = require("../socket");

const Post = require("../models/postData");
const User = require("../models/user");
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

// creating a post
exports.postData = async (req, res, next) => {
  const { userId, dbId, images, ...tData } = req.body;
  // console.log(req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Post Creation Failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    let creator;
    const post = new Post({
      tData: { ...tData },
      creator: userId,
      images,
      dbId,
    });
    await post.save();

    const db = await Database.findById(dbId);
    db.posts.push(post);
    await db.save();

    const user = await User.findById(userId);
    creator = user;
    user.entries.push(post);

    // Send notifications to users within the database
    const databaseUsers = await User.find({ "databases.dbId": dbId });
    for (const user of databaseUsers) {
      const notification = Notification.create({
        userId: user._id,
        message: `New post added in ${db.name} database.`,
      });
      const userId = user._id.toString();
      // Emit Socket.IO notification to the user
      io.emitToUser(userId, "notification", {
        action: "create",
        message: `New post added in ${db.name} database.`,
        dbId,
        createdAt: new Date().toISOString(),
      });
    }

    await user.save();
    res.status(201).json({
      message: "Entry created successfully!",
      post,
      creator: { _id: creator._id, name: creator.name },
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// finding 1 post
exports.getData = async (req, res, next) => {
  const { postId } = req.params;
  // for testing
  // const postId = "6585bd07522fcf798512705f"; //req.body; "6584c0b0740553af89c80303";

  try {
    const post = await Post.findById(postId).populate("creator");
    // const profit = +post.carSellPrice - +post.carPurchasePrice;
    if (!post) {
      errorMessageStatus("Could not find post.", 404);
    }
    res.status(200).json({
      message: "Post fetched!",
      post,
      // profit,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// updating an existing post
exports.updateData = async (req, res, next) => {
  const { postId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorMessageStatus(
      "Validation failed, entered data is incorrect.",
      422
    ); // Added return statement
  }
  const { userId, dbId, images, ...tData } = req.body;
  try {
    const db = await Database.findById(dbId);
    if (!db) {
      errorMessageStatus("Could not find database.", 404);
    }

    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      return errorMessageStatus("Could not find post.", 404); // Added return statement
    }
    if (post.creator._id.toString() !== userId) {
      return errorMessageStatus("Not authorized!", 403); // Added return statement
    }
    // add image update logic here
    if (db.media) {
      cloudinary.v2.uploader.destroy(post.images[0].publicId);
      post.images = images;
    }

    // Update tData field and mark it as modified
    post.tData = tData;
    post.markModified("tData");
    post.modified = true;
    // // Loop through each key in tData and update corresponding field in post
    // for (let key in tData) {
    //   if (post.tData[key] !== undefined) {
    //     post.tData[key] = tData[key];
    //     console.log(`Updated ${key} to:`, tData[key]);
    //   } else {
    //     console.log(`Field ${key} does not exist in the post object.`);
    //   }
    // }
    // console.log(post);

    // Send notifications to users within the database
    const databaseUsers = await User.find({ "databases.dbId": dbId });
    for (const user of databaseUsers) {
      await Notification.create({
        userId: user._id,
        message: `A Post was just updated in ${db.name}.`,
      });
      const userId = user._id.toString();
      // Emit Socket.IO notification to the user
      io.emitToUser(userId, "notification", {
        action: "update",
        message: `A Post was just updated in ${db.name} database.`,
        dbId,
        createdAt: new Date().toISOString(),
      });
    }

    const result = await post.save();
    res.status(200).json({
      message: "Entry Updated!!!",
      result,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// deleting an existing post
exports.deletePost = async (req, res, next) => {
  const { dbId, postId, userId } = req.body;
  try {
    const db = await Database.findById(dbId);
    if (!db) {
      errorMessageStatus("Could not find database.", 404);
    }
    db.posts.pull(postId);
    await db.save();

    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      errorMessageStatus("Could not find post.", 404);
    }
    if (post.creator._id.toString() !== userId) {
      errorMessageStatus("Not authorized!", 403);
    }
    await Post.findByIdAndDelete(postId);

    // add delete image from cloudinary here
    if (db.media) {
      cloudinary.v2.uploader.destroy(post.images[0].publicId);
    }

    const user = await User.findById(userId);

    user.entries.pull(post);

    await user.save();

    res.status(201).json({
      message: "Post Deleted successfully!",
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

// finding all posts
// incomplete api, will update it when i'll work on individual databases
exports.allPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    // add more logic here when necessary
    res.status(200).json({
      message: "Fetched All Posts Successfully!!!",
      posts,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};
