const {
  signup,
  login,
  logout,
  refreshToken,
} = require("../controllers/authController");
const { getUser } = require("../controllers/userController");
// const { refresToken } = require("../middlewares/refreshToken");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);

module.exports = router;
