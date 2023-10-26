import Post from '../models/post.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => { 
  const post = new Post(req.body);
  try {
    await post.save();
    return res.status(200).json({
      message: 'Successfully signed up!'
    });
  } catch (err) { 
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let posts = await Post.find().select('name description updated created');
    res.json(posts);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const postById = async (req, res, next, id) => { 
  try {
    let post = await Post.findById({_id: id})
    .populate('like', '_id name')
    .populate('comment', '_id name')
    .exec();

    if(!post) {
      return res.status(400).json({
        error: 'Post not found'
      });
    }
    req.profile = post;
    next();
  } catch (err) { 
    console.log(err);
    return res.status(400).json({
      error: "Could not retrieve post"
    });
  }
};

const read = (req, res) => { 
  req.name = 'ss';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let post = req.profile;
    post = merge(post, req.body);
    post.updated = Date.now();
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res, next) => {
  try {
    console.log('deleted');
    let post = req.profile;
    console.log('post to remove', post);
    let deletedPost = await post.deleteOne();
    res.json(deletedPost);
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const addPost = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { posts: req.body.postId } },
      { new: true }
    )
      .populate('comment', '_id name')
      .populate('like', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const addLike = async(req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.likeId,
      { $push: { likes: req.body.likeId } },
      {new: true}
    )
    .populate('like', '_id title')
    .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

const addComment = async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.commentId,
      { $push: { comments: req.body.postId } },
      { new: true }
    )
    .populate('comments', '_id title')
    .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  } catch(err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const removeComment = async (req, res) => {
  try {
    const result = await Comment.findByIdAndUpdate(
      req.body.uncommentId,
      { $pull: { comments: req.body.postId } },
      {  new: true }
    )
      .populate('comments', '_id title')
      .exec();

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

const removeLike = async (req, res) => {
  try {
    const result = await Like.findByIdAndUpdate(
      req.body.unlikeId,
      { $pull: { likes: req.body.likeId } },
      {  new: true}
    )
      .populate('like', '_id name')
      .exec();

    res.json(result);  
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

export default {
  create,
  list,
  read,
  remove,
  postById,
  update,
  addPost,
  addLike,
  addComment,
  removeLike,
  removeComment,
};