const express = require("express");

const dbUserController = require("../controller/databaseControllers/dbUser");
const dbAdminController = require("../controller/databaseControllers/dbAdmin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/createDatabase", isAuth, dbAdminController.createDatabase);

router.post("/addNewMember", isAuth, dbAdminController.addNewMember);

router.get("/getUserData/:dbId/:userId", isAuth, dbAdminController.getUserData);

router.post("/removeUser", isAuth, dbAdminController.removeUser);

router.post("/changeUserRole", isAuth, dbAdminController.changeUserRole);

router.get("/getUsers", isAuth, dbUserController.getUsers);

router.get("/getPosts/:dbId", isAuth, dbUserController.getPosts);

router.get("/getPost/:postId", isAuth, dbUserController.getPost);

router.get("/getPostHeaders/:dbId", isAuth, dbUserController.getPostHeaders);

router.get("/getPostsPDF/:dbId", isAuth, dbUserController.getPostsPDF);

router.get("/getPostPDF/:dbId/:postId", isAuth, dbUserController.getPostPDF);

router.get("/getUsersPDF/:dbId", isAuth, dbAdminController.getUsersPDF);

router.post("/test", isAuth, dbUserController.test);

// router.post("/editUser", userController.editUser);

module.exports = router;
