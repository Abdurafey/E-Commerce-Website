import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const {name, email, password } = req.body;
  console.log(req.body);

  try {
    if (
      !name ||
      !email ||
      !password ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (existingUser) {
      return next(
        errorHandler(
          400,
          "User already exists with the provided name or email."
        )
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    console.log(newUser);
    // Save the user to the database
    await newUser.save();
    return res
      .status(201)
      .json(new ApiResponse(200, "User Registered Successfully!"));

    // Generate JWT token

    // Return success response with token
  } catch (error) {
    console.error("Error while registering user:", error);
    return next(errorHandler(500, "Internal server error."));
  }
});
/*
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields required!"));
  }
  try {
    const validUser = await User.findOne({ email });

    //check if user exist or not
    if (!validUser) {
      // return res.status(404).json({ message: "User not found" });
      return next(errorHandler(404, "User not found!"));
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      validUser.password
    );

    if (!isPasswordMatch) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const token = jwt.sign(
      { _id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.SECRET_KEY
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    // res.status(500).json({ status: false, message: "Failed to Login" });
    next(err);
  }
});

export const google = asyncHandler(async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY
      );
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(generatedPassword, salt);

      // Create a new user
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoUrl,
      });
      console.log(newUser);

      await newUser.save();
      const token = jwt.sign(
        { _id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.SECRET_KEY
      );
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
});
*/