import Product from '../models/product.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async(req, res) => {
    const product = new Product(req.body);
    try{
        await product.save();
        return res.status(200).json({
            message: 'Successfully signed up!'
        });
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async(req, res) => {
    try {
        let products = await Product.find().select('name stock price updated created');
        res.json(products);
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const productById = async(req, res, next, id) => {
    try {
        let product = await Product.findById({_id: id});
        if(!product) {
            return res.status(400).json({
                error:'Product not found'
            });
        }
        req.profile = product;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve product"
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = 'ss';
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try {
        let product = req.profile;
        product = merge(product, req.body);

        product.updated= Date.now();
        await product.save();
        product.salt = '';
        res.json(product);
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
        let product = req.profile;
        console.log('product to remove', product);
        let deletedProduct = await product.deleteOne();
        deletedProduct.salt = '';
        res.json(deletedProduct);
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
    productById,
    update
};