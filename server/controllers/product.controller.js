import Product from '../models/product.model';
import merge from 'lodash/merge';
import dbErrorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: 'Successfully signed up'
    });
  } catch (err){
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    const products = await Product.find().select('product upsdated');
    res.json(products);
  }catch(err){
    console.log(err);
    return res.status(400).json({
      error: 'Could not retrieve Product'
    });
  }
};
const productById = async(req, res, next, id) =>{
  try{
    let product = await Product.findById({_id: id})
    .populate('category', ':id name')
    .exec();

    if(!product){
      return res.status(400).json({
      error: 'product not found'
    });
    }
    req.profile = product;
    next();
  }catch (err){
    console.log(err);
    return res.status(400).json({
      error: "Could not retrieve product"
    });
  }
};


const update = async (req, res, next) => {
  try {
    let product = req.profile;
    product = merge(product, req.boby);
    product.update = Date.now();
    await product.save();
    product.salt = '';
    res.json(product);
  }catch (err) {
    console.log(err);
    return res.status(400).json({
      error: ErrorHandler.getErrorMessage(err)
    });
  }
};
const remove = async (req, res, next) => {
  try {
    console.log('deleted');
    let product = req.profile;
    console.log('product to remove', product);
    let deletedproduct = await product.deleteOne();
    deletedproduct.hashed_password = '';
    deletedproduct.salt = '';
    res.json(deletedproduct);
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

export default {
  create,
  list,
  update,
  remove,
  productById,
  read
}