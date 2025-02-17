import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid Token" });
    }
  } else {
    return res.status(400).json({ message: "UnAuthorized Token" });
  }
};

export default verifyToken;
