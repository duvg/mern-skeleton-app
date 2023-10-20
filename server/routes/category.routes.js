import express from 'express';
import categoryCtrl from '../controllers/category.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/categories')
  .get(categoryCtrl.list) 
  .post(categoryCtrl.create);

router.route('/api/categories/:categoryId')
  .get(authCtrl.requireSignin, categoryCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, categoryCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, categoryCtrl.remove);

router.param('categoryId', categoryCtrl.categoryById);

export default router;