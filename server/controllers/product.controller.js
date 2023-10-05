import Product from '../models/product.model';
import merge from 'lodash/merge';
import dbErrorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const product = new Product(req, body);
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
    let products = await Product.find().select('product upsdated');
    res.json(products);{
      return res.status(400).json({
        error: 'Product not found'
      });
    }
    req.profile = product;
    next();
  }catch(err){
    console.log(err);
    return res.status(400).json({
      error: 'Could not retrieve Product'
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