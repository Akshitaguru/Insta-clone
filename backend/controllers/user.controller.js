import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import {Post} from "../models/post.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Try different email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check for missing fields
      if (!email || !password) {
          return res.status(400).json({
              message: "Email and password are required.",
              success: false,
          });
      }

      // Find the user by email
      let user = await User.findOne({ email });
      console.log("User found:", user); // Log the user object

      // Ensure user exists and has a password
      if (!user || !user.password) {
          return res.status(401).json({
              message: "Incorrect email or password",
              success: false,
          });
      }

      console.log("Stored password hash:", user.password); // Log the stored hash

      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      console.log("Is password match:", isPasswordMatch); // Log the comparison result

      if (!isPasswordMatch) {
          return res.status(401).json({
              message: "Incorrect email or password",
              success: false,
          });
      }

      // Create a JWT token
      const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

      // Prepare user data to return
      const userData = {
          _id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          bio: user.bio,
          followers: user.followers,
          following: user.following,
          posts: user.posts, // Assuming you want to send the user's posts
      };

      // Send the response with the token as a cookie
      return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
          message: `Welcome back ${user.username}`,
          success: true,
          user: userData
      });

  } catch (error) {
      console.error("Login error:", error); // Log the error
      return res.status(500).json({
          message: "Internal server error",
          success: false,
      });
  }
};


export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId).populate({path: 'posts', createdAt:-1}).populate('bookmarks');
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;

    let cloudResponse;
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId).select("-passward");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-passward"
    );
    if (!suggestedUsers) {
      return res.status(400).json({
        message: "Currently do not have any users.",
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const follorKrneWala = req.id;
    const jiskoFollowKarunga = req.params.id;
    if (follorKrneWala === jiskoFollowKarunga) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(follorKrneWala);
    const targetUser = await User.findById(jiskoFollowKarunga);

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isFollowing = user.following.includes(jiskoFollowKarunga);
    if (isFollowing) {
      //unfollow logic
      await Promise.all([
        User.updateOne(
          { _id: follorKrneWala },
          { $pull: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $pull: { followers: jiskoFollowKarunga } }
        ),
      ]);
      return res
        .status(200)
        .json({ message: "Unfollowed Successfully", success: true });
    } else {
      //follow logic
      await Promise.all([
        User.updateOne(
          { _id: follorKrneWala },
          { $push: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $push: { followers: jiskoFollowKarunga } }
        ),
      ]);
      return res
        .status(200)
        .json({ message: "Follow Successfully", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export default User;
