
import Category  from '../models/category.model';
import merge from 'lodash/merge';
import dbErrorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
    const category = new category(req.body);
    try {
        await category.save();
        return res.status(200).json({
            message: 'Successfully signed up!'
        });
    } catch (err) {
        return res.status(400).json({
            error:dbErrorHandler.getUniqueErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        let categories = await Category.find().select('name description update created');
        res.json(categories);
    } catch (err) {
        return res.status('400').json({
            error: dbErrorHandler.getUniqueErrorMessage(err)
        });
    }
};


const categoryById = async (req, res, next, id) => {
    try {
        let category = await Category.findById({_id:id});
        if(!category) {
            return res.status(400).json({
                error:'category not found'
            });
        }
        req.profile = category
        next();
    } catch (err) {
        return res.status(400).json({
            error:"could not retrieve category"
        });
    }
};


const remove =async (req, res, next) => {
    try {
        console.log ('deleted');
        let category = req.profile;
        console.log ('category to remove', category)
        let deletedcategory = await category.deleteone();
        res.json (deletedcategory)
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error:dbErrorHandler.getUniqueErrorMessage(err)
        });
    }
};

export default{
    create,
    list,
    remove,
    categoryById,
}

