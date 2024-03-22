const express = require("express");
const { body } = require("express-validator");

const postDataController = require("../controller/post-data");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/postData", isAuth, postDataController.postData);

router.get("/getData/:postId", isAuth, postDataController.getData);

router.post("/updateData/:postId", isAuth, postDataController.updateData);

router.post("/deletePost", isAuth, postDataController.deletePost);

router.get("/allPosts", isAuth, postDataController.allPosts);

module.exports = router;

// http://localhost:8080/getData/658352806036e87046c9d5fa
// 65dfcdcba3c1cfa9bc8657eb
// http://localhost:8080/api/post/getData/65dfcdcba3c1cfa9bc8657eb

// json request data format for postman
/* 
{
    "userId": "6588b97e5725a334fb6e8fc0",
    "carName": "xyz",
    "carModel": "abc",
    "carPurchasePrice": "1899",
    "carSellPrice": "2000",
    "remarks": "Sold Car Data Updated!!!"
}
*/
