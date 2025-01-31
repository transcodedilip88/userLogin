const jwt = require("jsonwebtoken");
const SECRET = "ioendlckn65";

const getAllUsers = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(404).json({ error: "token has not found" });

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(404).json({ error: "unauthorized" });

    const decode = jwt.verify(token, SECRET);
    req.usermod = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
const blockAnddeleteuser = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(404).json({ error: "token has not found" });

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(404).json({ error: "unauthorized" });

    const decode = jwt.verify(token, SECRET);
    req.usermod = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
const getUserById = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(404).json({ error: "token has not found" });

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(404).json({ error: "unauthorized" });

    const decode = jwt.verify(token, SECRET);
    req.usermod = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
const verifyToken = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(404).json({ error: "token has not found" });

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(404).json({ error: "unauthorized" });

    const decode = jwt.verify(token, SECRET);
    req.usermod = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

const generateToken = (usermod) => {
  return jwt.sign(usermod, SECRET);
};

module.exports = {getAllUsers, generateToken, blockAnddeleteuser ,getUserById,verifyToken};
