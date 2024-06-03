const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
