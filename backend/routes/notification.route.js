import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getNotifications,
//   deleteNotification,
  deleteNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

// Define your notification routes here
router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
// router.delete("/:id", protectRoute, deleteNotification);

export default router;
