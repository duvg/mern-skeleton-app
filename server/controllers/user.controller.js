import formidable from 'formidable';
import fs from 'fs';
import { extend } from 'lodash';
import defaultlmage from './../../client/assets/images/jose.png';

import User from '../models/user.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';
import { Form } from 'react-router-dom';
import { json } from 'body-parser';

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
    let users = await User.find().select(
      'name email updated created'
    );
    res.json(users);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById({ _id: id })
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();

    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Could not retrieve user'
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  req.name = 'ss';
  return res.json(req.profile);
};

const update = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(400).json({
          error: 'Photo could not be uploaded'
        });
      }
      let user = req.profile;
      user = extend(user, fields);
      user.updated = Date.now();

      if (files.photo) {
        user.photo.data = fs.readFileSync(files.photo.filepath);
        user.photo.contentType = files.photo.type;
      }
      await user.save();
      user.hashed_password = '';
      user.salt = '';

      res.json({ user });
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage('error', err)
      });
    }
  });
  // try {
  //   let user = req.profile;
  //   user = merge(user, req.body);

  //   user.updated = Date.now();
  //   await user.save();
  //   user.hashed_password = '';
  //   user.salt = '';
  //   res.json(user);
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({
  //     error: errorHandler.getErrorMessage(err)
  //   });
  // }
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
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const addFollower = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

/////// Esto permite acceder a los archivos de la app en este caso a las img///////
const defaultPhoto = (req, res) => {
  return res.sendFile(`${process.cwd()}${defaultlmage}`);
};

////Se usa el Push ya que se debe agg un valor al array del usuario///////
const addFollowing = async (req, res, next) => {
  console.log('asdadasdsdasd');
  console.log(req.body);
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId }
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

/////Este metodo sirve para eliminar seguidores///////////
const removeFollower = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage()
    });
  }
};

//// Se usa el parametro Pull para jalar un registro y eliminarlo de Following/////////
const removerFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.unfollowId }
    });
    next();
  } catch (err) {
    return read.status(400).json({
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
  addFollower,
  addFollowing,
  removeFollower,
  removerFollowing
};
