const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("req.headers", req.headers);
  const token = req.headers["authorization"].split(" ")[1];

  console.log("token", token);
  // const allCookies = cookie.split(";");
  // const userCookie = allCookies?.find((cookie) =>
  //   cookie.includes("refreshtoken")
  // );
  // console.log("cookie", userCookie.split("=")[1]);
  // console.log("end");
  // const token = userCookie.split("=")[1];

  if (!token || token === null) {
    return res.status(404).json({
      message: "No Token Found",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    console.log("error", error);
    if (error) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    console.log("user", user);
    req.user = user.id;
    next();
  });
};

module.exports = verifyToken;
