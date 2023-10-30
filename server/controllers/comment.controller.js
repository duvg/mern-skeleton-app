import Comment from '../models/comment.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';
import { extend } from 'lodash';

const create = async(req, res) => {
    const comment = new Comment(req.body);
    try{
        await comment.save();
        return res.status(200).json({
            message: 'Comment created successfully!'
        });
    }catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async(req, res) => {
    try{
        let comments = await Comment.find().select('description user updated created');
        res.json(comments);
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const commentById = async (req, res, next, id) => {
    try{
        let comment = await Comment.findById({_id: id}) 
        .populate('following','_id ')
        .populate('followers', '_id ')
        .populate('user', '_id name')
        exec();

        if(!comment){
            return res.status(400).json({
                error: 'Post not found'
            });
        }
        req.profile = comment;
        next();
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve comment"
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = '';
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try{
        let comment = req.profile;
        comment = extend(post, fields);
        comment.updated = Date.now();
        await post.save();
        res.json(comment);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async(req, res, next) => {
    try{
        console.log('deleted');
        let comment = req.profile;
        console.log('comment to remove', comment);
        let deletedComment = await comment.deleteOne();
        res.json(deletedComment); 
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};



const addlikeComment = async (req, res) => {
    try {
      const { userId, commentId } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } }, 
        { new: true }
      );
  
      res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({
        error: "No se pudo dar 'me gusta' al comentario."
      });
    }
  };
  
  const addunlikeComment = async (req, res) => {
    try {
      const { userId, commentId } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true }
      );
  
      res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({
        error: "No se pudo quitar 'me gusta' del comentario."
      });
    }
  };
 
export default{
    create,
    list,
    read,
    remove,
    commentById,
    update,
    addlikeComment,
    addunlikeComment
  };