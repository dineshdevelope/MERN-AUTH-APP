import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(404).json({ message: "All fields Required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    //GenerateToken
    generateToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Internal Server Error Register Controller" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "All fields Required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Exits" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ mesage: "Wrong Password" });
    }
    generateToken(res, user._id);

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal Server Error Login Controller" });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Sucessfull" });
};

export const getProfile = async (req, res) => {
  // const user = {
  //  _id: req.user._id,
  //  username: req.user.username,
  // email: req.user.email,
  //};
  try {
    const primaryUser = await User.findById({ _id: req.user._id }).select(
      "-password"
    );
    console.log(`Primary Id:${primaryUser}`);
    return res.status(200).json(primaryUser);
  } catch (error) {
    return res.status(400).json({
      message: "Internal Server Error get Profile Controller Controller",
    });
  }
};

/*  export const updateProfile = async (req, res) => {
   const { password } = req.body;
  if (!password === "") {
    const hashedPassword = await bcrypt.hash(password, 10);
  } 
  try {
    const primaryUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ primaryUser });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal Server Error update Controller Controller" });
  }
}; */
export const updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        username,
        email,
        ...(password && { password: hashedPassword }), // Update password only if provided
      },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error in updateProfile Controller" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.user._id });
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal Server Error delete Controller Controller" });
  }
};
