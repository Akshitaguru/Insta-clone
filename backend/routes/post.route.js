import express from "express";
import isAuthenticted from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticted, upload.single('image'), addNewPost);
router.route("/all").get(isAuthenticted, getAllPost);
router.route("/userpost/all").get(isAuthenticted, getUserPost);
router.route("/:id/like").get(isAuthenticted, likePost);
router.route("/:id/dislike").get(isAuthenticted, dislikePost);
router.route("/:id/comment").post(isAuthenticted, addComment);
router.route("/:id/comment/all").post(isAuthenticted, getCommentsOfPost);
router.route("/delete/:id").post(isAuthenticted, deletePost);
router.route("/:id/bookmark").post(isAuthenticted, bookmarkPost);

export default router;
