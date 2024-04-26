const express = require("express");

const userController = require("../controller/user");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put("/editUser", isAuth, userController.editUser);

router.get("/userPosts", isAuth, userController.userPosts);

router.get("/getUserDatabases/:userId", isAuth, userController.getDatabases);

router.get("/getDatabase/:dbId", isAuth, userController.getDatabase);

router.post("/editUserDetails", isAuth, userController.editUserDetails);

router.post("/editUserPassword", isAuth, userController.editUserPassword);

router.post("/editAbout", isAuth, userController.editAbout);

router.post("/changeProfilePic", isAuth, userController.changeProfilePic);

router.get(
  "/getNotifications/:userId",
  isAuth,
  userController.getNotifications
);

router.post("/postToDo", isAuth, userController.postToDo);

router.get("/getTodos/:userId", isAuth, userController.getTodos);

router.put("/changeToDoStatus", isAuth, userController.changeToDoStatus);

router.post("/deleteTodo", isAuth, userController.deleteTodo);

router.patch(
  "/markNotificationsRead",
  isAuth,
  userController.markNotificationsRead
);

// router.post("/editUser", userController.editUser);

module.exports = router;
