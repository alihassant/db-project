const express = require("express");

const superAdminController = require("../controller/superAdmin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/deleteUser", superAdminController.deleteUser);

router.get("/getDatabases", superAdminController.getDatabases);

router.get("/getAllUsers", superAdminController.getAllUsers);

router.get("/getUsersNumber/:userId", superAdminController.getUsersNumber);

router.get("/getPostsNumber/:userId", superAdminController.getPostsNumber);

router.get("/getUserDetails/:userId", superAdminController.getUserDetails);

router.get("/getUserDatabase/:dbId", superAdminController.getUserDatabase);

router.patch("/changeUserDetails", superAdminController.changeUserDetails);

router.patch("/changeUserPassword", superAdminController.changeUserPassword);

router.patch(
  "/changeTableHeaders/:dbId",
  superAdminController.changeTableHeaders
);

router.patch("/changeTableDetails", superAdminController.changeTableDetails);

module.exports = router;
