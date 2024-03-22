const express = require("express");

const adminController = require("../controller/adminController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/setRole", isAuth, adminController.setRole);

router.get("/findUser", isAuth, adminController.findUser);

module.exports = router;
