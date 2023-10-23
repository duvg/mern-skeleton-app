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
    let post = await Post.findById({_id: id});
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



export default {
  create,
  list,
  read,
  remove,
  postById,
  update,
  addPost
};