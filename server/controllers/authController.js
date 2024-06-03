const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (!existingUser || existingUser === null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();
      return res.status(201).json({ data: user });
    } else {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went Wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (!existingUser || existingUser === null) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    console.log("Secret key", process.env.JWT_SECRET_KEY);
    const token = jwt.sign(
      { id: existingUser?._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const refreshtoken = jwt.sign(
      { id: existingUser?._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    refreshTokens.push(refreshtoken);
    res.cookie("refreshtoken", refreshtoken, {
      path: "/",
      expiresIn: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Successfully logged In",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.logout = async (req, res) => {
  const cookie = req.headers.cookie;

  console.log("all cookie", req.headers);
  const allCookies = cookie.split(";");
  const userCookie = allCookies?.find((cookie) =>
    cookie.includes("refreshtoken")
  );
  console.log("cookie", userCookie.split("=")[1]);
  console.log("end");
  const token = userCookie.split("=")[1];

  if (!token) {
    return res.status(404).json({
      message: "No token found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    console.log("error", error);
    if (error) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    res.clearCookie("refreshtoken");
    return res.status(200).json({
      message: "Successfully logged out",
    });
  });
};
exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshtoken;
  if (!token) return res.status(401).json("Unauthorized");
  if (!refreshTokens.includes(token)) return res.status(403).json("Forbidden");

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Forbidden");
    const accessToken = jwt.sign(
      { id: existingUser?._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.json({ token: accessToken });
  });
};
