const User = require("../models/user");

module.exports = async (req, res, next) => {
  const { userId } = req;
  const checkAdmin = await User.findById(userId);
  if (checkAdmin.extraRole !== "superAdmin") {
    const error = new Error("You are not authorized to perform this function.");
    error.statusCode = 403;
    throw error;
  }
  next();
};
