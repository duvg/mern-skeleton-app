import categoryModel from "../models/category.model";
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';


const create = async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
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
    try
}



