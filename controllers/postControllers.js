const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Posts (only logged-in user's posts)
exports.getPosts = async (req, res) => {
  try {
const posts = await Post.find({ user: req.user.id })
  .populate("user", "name email");

    res.json(posts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        title: req.body.title,
        content: req.body.content
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
