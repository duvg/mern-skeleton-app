import Comment from '../models/comment.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import { extend } from 'lodash';

const create = async (req, res) => {
    const comment = new Comment(req.body);
    try {
        await comment.save();
        return res.status(400).json({
            message: 'Successfully signed up'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        let comments = await Comment.find().select('comment updated created');
        res.json(comments);
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const commentById = async (req, res, next, id) => {
    try {
        let comment = await Comment.findById({ _id: id })
        .populate('comment', '_id comment')
        .populate('like', 'id like')
        .exec()

        if(!comment) {
            return res.status(400).json({
                error: 'Comment not found'
            });
        }
        req.profile = comment;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve comment"
        });
    }
};

const read = (req, res) => {
    req.name = 'ss'
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try {
      let comment = req.profile;
      comment = merge(comment, req.body);
      comment.updated = Date.now();
      await comment.save();
      res.json(comment);
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

const addComment = async (req, res) => {
    try {
      const result = await Post.findByIdAndUpdate(
        req.body.commentId,
        {
            post: req.body.postId
        },
        // { $push: { comment: req.body.postId } },
        { new: true }
      )
      .populate('comments', '_id title')
      .exec();
      console.log(result)
      res.json(result);
    } catch(err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };


//   const addLike = async (req, res) => {
//     try {
//       const result = await Comment.findByIdAndUpdate(
//         req.body.commentId,
//         { $push: { likes: req.body.likeId } },
//         {new: true}
//       )
//       .populate('like', '_id title')
//       .exec();
//       res.json(result);
//     } catch (err) {
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err)
//       });
//     }
//   }

  export default {
    create,
    list,
    update,
    read,
    remove,
    commentById,
    addComment,
    // addLike
  }