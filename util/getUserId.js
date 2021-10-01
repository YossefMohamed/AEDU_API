const jwt = require("jsonwebtoken");

const getUserId = (req) => {
  if (!req.headers.authorization) throw new Error("Please Login!");
  const token = req.headers.authorization.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : "";
  let id;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new Error("Please Login!");
      id = decoded.userId;
    });
  }
  return id;
};

module.exports = getUserId;
