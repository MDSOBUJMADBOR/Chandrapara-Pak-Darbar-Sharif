import express from "express";
import {
  createAnser,
  getAllAnser,
  getAnserById,
  updateAnser,
  deleteAnser,
} from "../controllers/anser.controller.js";

const router = express.Router();

router.route("/")
  .post(createAnser)
  .get(getAllAnser);

router.route("/:id")
  .get(getAnserById)
  .put(updateAnser)
  .delete(deleteAnser);

export default router;

