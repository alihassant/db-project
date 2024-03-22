const express = require("express");

const superAdminController = require("../controller/superAdmin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/deleteUser", isAuth, superAdminController.deleteUser);

router.get("/getDatabases", isAuth, superAdminController.getDatabases);

router.get("/getAllUsers", isAuth, superAdminController.getAllUsers);

router.get(
  "/getUsersNumber/:userId",
  isAuth,
  superAdminController.getUsersNumber
);

router.get(
  "/getPostsNumber/:userId",
  isAuth,
  superAdminController.getPostsNumber
);

module.exports = router;
