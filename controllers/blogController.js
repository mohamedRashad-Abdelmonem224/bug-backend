const BlogPost = require('../models/BlogPost')

exports.listPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    next(err)
  }
}
