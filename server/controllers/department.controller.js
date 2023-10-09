import Deparment from '../models/department.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
    const department = new Deparment(req.body);
    try {
        await department.save();
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
        let deparments = await Deparment.find().select('name updated created');
        res.json(deparments);
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const deparmentById = async (req, res, next, id) => {
    try {
        let deparment = await Deparment.findById({_id: id});
        if(!deparment) {
            return res.status(400).json({
                error: 'Department not found'
            });
        }
        req.profile = deparment;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve user"
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = '';
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try {
        let deparment = req.profile;
        deparment = merge(deparment, req.body);

        deparment.updated = Date.now();
        await deparment.save();
        deparment.salt= '';
        res.json(deparment);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async (req, res, next) => {
    try{
        console.log('deleted');
        let deparment = req.profile;
        console.log('deparment to remove', deparment);
        let deleteDeparment = await deparment.deleteOne();
        deleteDeparment.salt = '';
        res.json(deleteDeparment);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        });
    }
};

export default {
    create,
    list,
    read,
    remove,
    deparmentById,
    update
};