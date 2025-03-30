const SocialMediaPost = require('../models/SocialMediaPost');

// Get all social media posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await SocialMediaPost.find()
      .sort({ scheduledTime: 1 })
      .populate('campaign', 'name');
    
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single post
exports.getPost = async (req, res) => {
  try {
    const post = await SocialMediaPost.findById(req.params.id)
      .populate('campaign', 'name');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const {
      content,
      images,
      scheduledTime,
      platforms,
      campaign
    } = req.body;
    
    const newPost = new SocialMediaPost({
      content,
      images,
      scheduledTime,
      platforms,
      campaign,
      createdBy: req.user.id
    });
    
    await newPost.save();
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const {
      content,
      images,
      scheduledTime,
      platforms,
      status,
      campaign
    } = req.body;
    
    let post = await SocialMediaPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Cannot edit post that has already been posted
    if (post.status === 'posted' && req.body.status !== 'posted') {
      return res.status(400).json({ 
        message: 'Cannot edit a post that has already been published' 
      });
    }
    
    // Update fields
    if (content) post.content = content;
    if (images) post.images = images;
    if (scheduledTime) post.scheduledTime = scheduledTime;
    if (platforms) post.platforms = platforms;
    if (status) post.status = status;
    if (campaign) post.campaign = campaign;
    
    post = await post.save();
    
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await SocialMediaPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Cannot delete post that has already been posted
    if (post.status === 'posted') {
      return res.status(400).json({ 
        message: 'Cannot delete a post that has already been published' 
      });
    }
    
    await SocialMediaPost.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
