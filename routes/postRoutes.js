const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const postController = require("../controllers/postControllers");

const router = express.Router();

router.post("/", authMiddleware, postController.createPost);
router.get("/", authMiddleware, postController.getPosts);
router.put("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
