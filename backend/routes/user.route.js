import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticted from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticted, getProfile);
router.route('/profile/edit').post(isAuthenticted, upload.single('profilePicture'), editProfile);
router.route('/suggested').get(isAuthenticted, getSuggestedUsers); 
router.route('/followorunfollow/:id').post(isAuthenticted, followOrUnfollow);

export default router;