import Pais from '../models/pais.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
  const pais = new Pais(req.body);
  try {
    await pais.save();
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
    let pais = await Pais.find().select(
      '_id name'
    );
    res.json(pais);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const paisById = async (req, res, next, id) => {
  try {
    let pais = await Pais.findById({_id: id});
    if (!pais) {
      return res.status(400).json({
        error: 'Pais Not Found'
      });
    }
    req.profile= pais;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:'Could not retivese Pais'
    });
  }
};

const read = (req, res) => {
  req.profile.salt = undefined;
  req.name = 'aa';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let pais = req.profile;
    pais = merge(pais, req.body);

    pais.update = Date.now();
    await pais.save();
    pais.salt = '';
    res.json(pais);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res, next) =>{
  try {
    console.log('deleted');
    let pais = req.profile;
    console.log('pais to remove', pais);
    let deletedPais = await pais.deleteOne();
    deletedPais.salt = '';
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
    }
  };

  export default{
    create,
    list,
    read,
    remove,
    paisById,
    update
};