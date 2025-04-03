import express from "express";
import isAuthenticted from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/send/:id').post(isAuthenticted, sendMessage);
router.route('/all/:id').get(isAuthenticted, getMessage);


export default router;