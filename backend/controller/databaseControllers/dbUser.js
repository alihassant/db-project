const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
const PDFDocument = require("pdfkit");

const Post = require("../../models/postData");
const User = require("../../models/user");
const Database = require("../../models/database");

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

exports.getUsers = async (req, res, next) => {
  const { dbId } = req.body;

  try {
    const db = await Database.findById(dbId).populate("users.userId");
    if (!db) {
      errorMessageStatus(
        "Cannot find database, Please try again later!!!",
        404
      );
    }
    const dbUsers = db.users;

    res.status(200).json({
      message: "Users Fetched!!!",
      dbUsers,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  const { dbId } = req.params;
  try {
    const db = await Database.findById(dbId).populate("posts");

    const posts = db.posts;

    res.status(200).json({
      message: "Posts Fetched Successfully!!!",
      posts,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const postData = await Post.findById(postId).populate("creator");

    const post = { ...postData._doc };
    const { username } = post.creator;
    res.status(200).json({
      message: "Post Fetched Successfully!!!",
      post,
      username,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getPostHeaders = async (req, res, next) => {
  const { dbId } = req.params;
  try {
    const db = await Database.findById(dbId);
    const tHeaders = db.tHeaders;
    const { totalHeaders } = db;
    res.status(200).json({
      message: "Posts Fetched Successfully!!!",
      tHeaders,
      totalHeaders,
    });
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getPostsPDF = async (req, res, next) => {
  const { dbId } = req.params;
  try {
    const db = await Database.findById(dbId).populate("posts");
    const { posts } = db;
    if (!db) {
      errorMessageStatus("Cannot find the database!!!", 404);
    }

    const pdfName = `pdf-${dbId}.pdf`;
    const pdfPath = path.join("data", "postsPdf", pdfName);

    const imgPath = path.join("data", "VORTAPS.png");

    const pdfDoc = new PDFDocument();

    res.setHeader("Content-type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="' ${pdfName} '"`);

    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    pdfDoc.pipe(res);

    pdfDoc.font("Helvetica", "helvetica-bold").fontSize(24).text(`VORTAPS`, {
      // width: 410,
      align: "center",
    });

    pdfDoc.moveDown(1);

    // pdfDoc.lineWidth(0.5).moveTo(0, 60).lineTo(620, 60).stroke();
    pdfDoc.text("------------------------------------------------", {
      align: "center",
    });

    pdfDoc.moveDown(0.5);

    posts.forEach((post) => {
      pdfDoc
        .font("Helvetica")
        .fontSize(14)
        .text(`${db.tHeaders[0].tH1}: ${post.tData.tD1}`, {
          // width: 410,
          align: "justify",
        });

      pdfDoc.moveDown(0.5);

      pdfDoc
        .font("Helvetica")
        .fontSize(14)
        .text(`${db.tHeaders[0].tH2}: ${post.tData.tD2}`, {
          // width: 410,
          align: "justify",
        });

      pdfDoc.moveDown(0.5);

      pdfDoc
        .font("Helvetica")
        .fontSize(14)
        .text(`Created At: ${post.createdAt}`, {
          // width: 410,
          align: "justify",
        });

      pdfDoc.moveDown(0.5);

      // pdfDoc
      //   .font("Helvetica")
      //   .fontSize(14)
      //   .text(`${db.tHeaders[0].tH6}: ${post.tD6}`, {
      //     // width: 410,
      //     align: "justify",
      //   });

      // pdfDoc.moveDown(0.5);

      pdfDoc.text("------------------------------------------------", {
        align: "center",
      });
    });

    pdfDoc.end();
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.getPostPDF = async (req, res, next) => {
  const { dbId, postId } = req.params;
  try {
    const db = await Database.findById(dbId);
    if (!db) {
      errorMessageStatus("Cannot find the database!!!", 404);
    }

    const post = await Post.findById(postId).populate("creator");
    const { tData: tDs } = post;
    if (!post) {
      errorMessageStatus("Cannot find the post!!!", 404);
    }

    const pdfName = `pdf-${postId}.pdf`;
    const pdfPath = path.join("data", "postsPdf", pdfName);

    const imgPath = path.join("data", "VORTAPS.png");

    const pdfDoc = new PDFDocument();

    res.setHeader("Content-type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="' ${pdfName} '"`);

    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    pdfDoc.pipe(res);

    // pdfDoc.image(imgPath, 0, 0, { width: 620 });

    // pdfDoc.moveDown(4);

    pdfDoc.font("Helvetica", "helvetica-bold").fontSize(24).text(`VORTAPS`, {
      // width: 410,
      align: "center",
    });

    pdfDoc.moveDown(1);

    // pdfDoc.lineWidth(0.5).moveTo(0, 60).lineTo(620, 60).stroke();
    pdfDoc.text("------------------------------------------------", {
      align: "center",
    });

    pdfDoc.moveDown(0.5);

    pdfDoc
      .font("Helvetica")
      .fontSize(16)
      .text(`Created By: ${post.creator.username}`, {
        // width: 410,
        align: "justify",
      });

    pdfDoc.moveDown(0.5);

    for (let i = 0; i < db.totalHeaders; i++) {
      pdfDoc
        .font("Helvetica")
        .fontSize(16)
        .text(`${db.tHeaders[0][`tH${i + 1}`]}: ${tDs[`tD${i + 1}`]}`, {
          // width: 410,
          align: "justify",
        });

      pdfDoc.moveDown(0.5);
    }

    pdfDoc
      .font("Helvetica")
      .fontSize(16)
      .text(`Created At: ${post.createdAt}`, {
        // width: 410,
        align: "justify",
      });

    pdfDoc.moveDown(0.5);

    pdfDoc
      .font("Helvetica")
      .fontSize(16)
      .text(`Updated At: ${post.updatedAt}`, {
        // width: 410,
        align: "justify",
      });

    pdfDoc.moveDown(0.5);

    pdfDoc.end();
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};

exports.test = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
  } catch (err) {
    generalPromiseError(err);
    next(err);
  }
};
