import Post from '../models/post.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create  = async (req, res)=> {
  const post = new Post(req.body);
  try {
    await post.save();
    return res.status(200).json({
      message: 'Successfully signed up'
    });
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    const post = await Post.find().select('post upsdated');
    res.json(post);
  }catch(err){
    console.log(err);
    return res.status(400).json({
      error: 'Could not retrieve post'
    });
  }
};
const postById = async(req, res, next, id) =>{
  try{
    let post = await Post.findById({_id: id})
    .populate('postedById', ':_id  name ')
    .exec();

    if(!post){
      return res.status(400).json({
      error: 'post not found'
    });
    }
    req.profile = post;
    next();
  }catch (err){
    console.log(err);
    return res.status(400).json({
      error: "Could not retrieve post"
    });
  }
};

const update = async (req, res, next) => {
  try {
    let post = req.profile;
    post = merge(post, req.boby);
    post.update = Date.now();
    await post.save();
    post.salt = '';
    res.json(post);
  }catch (err) {
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
    let deletedpost = await post.deleteOne();
    deletedpost.hashed_password = '';
    deletedpost.salt = '';
    res.json(deletedpost);
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  req.name = 'ss';
  return res.json(req.profile);
  
};
const like = async(req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {$push:{ like: req.body.userId}},
      {new:true}
    )
    .populate('like', '_id name')
   
    .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};


const unLike = async(req, res, next) =>{
  try {
    await Post.findByIdAndUpdate(
      req.body.postld,
      {$pull: {like: req.body.userId}});
    next();
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};
const comment = async(req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {$push:{ comments:comment}},
      {new:true}
    )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
   
    .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
const uncomment = async(req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.postId,
      {$pull:{comments:{_id: comment._id}}},
      {new: true}
    )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec();
    res.json(result);
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};


export default {
  create,
  list,
  update,
  remove,
  postById,
  read,
 like,
 unLike,
  comment,
  uncomment,
 
}