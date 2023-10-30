import User from '../models/user.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';
import formidable from 'formidable';
import fs from 'fs';
import {extend} from 'lodash';
import defaultImagen from './../../client/assets/images/profile-pic.png';
import { Form } from 'react-router-dom';
import { exec } from 'child_process';


const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
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
    const users = await User.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const userById = async(req, res, next, id) =>{
  try{
    let user = await User.findById({_id: id})
    .populate('following', ':id name')
    .populate('followers', '_id name')
    .exec();

    if(!user){
      return res.status(400).json({
      error: 'User not found'
    });
    }
    req.profile = user;
    next();
  }catch (err){
    console.log(err);
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  req.name = 'ss';
  return res.json(req.profile);
};

const update = async (req, res, ) => {
  const form = new formidable.IncomingForm();
  form.keepExtension = true;
  Form.parse(req, async(err, fields, files)=>{
    try{
      if(err){
        return res.status(400).json({
          error: 'Photo could not be uploaded'
        });
      }

      let user = req.profile;
      user = extend(user, fields);
      user.update = Date.now();

      if(files.photo){
        user.photo.data =fs.readFileSync(files.photo.filepath);
         user.photo.contentType = files.photo.type;
      }
      await user.save();
      user.hashed_password = '';
      user.salt = '';

      res.json({usser});
    }  catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage('error', err)
      });
    }
  });
};


const remove = async (req, res, next) => {
  try {
    console.log('deleted');
    let user = req.profile;
    console.log('user to remove', user);
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = '';
    deletedUser.salt = '';
    res.json(deletedUser);
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const defaultPhoto  = (req, res) => {
  return res.sendFile(`${process.cwd()}${defaultImagen}`);
};
const addFollewer = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.followId,
      {$push:{ followers: req.body.userId}},
      {new:true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
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

const addFollowing = async(req, res, next) => {
  console.log("adasdasdsada");
  try{
    await User.findByIdAndUpdate(
      req.body.userId,
      {$push: {following: req.body.followId}});
      next();
  }catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remoteFollower = async(req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.unfollowld,
      {$pull:{followers: req.body.userld}},
      {new: true}
    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec();
    res.json(result);
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

const remoteFollowing = async(req, res, next) =>{
  try {
    await User.findByIdAndUpdate(
      req.body.userld,
      {$pull: {following: req.body.unfollowld}});
    next();
  }catch (err){
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
  userById,
  update,
  defaultPhoto,
  addFollewer,
  addFollowing,
  remoteFollower,
  remoteFollowing
};
