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

const updated = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, async (err,  fields, files) => {
        try {
            if (err) {
                return res.status(400).json({
                    error: 'Photo could not be uploaded'
                });
            }
            let comment
        }
    } )
}