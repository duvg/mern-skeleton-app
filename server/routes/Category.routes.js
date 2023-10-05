import express from 'express';
import categoryCtrl from '../controllers/category.controller';

const router = express.Router();

router.route('/api/categories')
.get(categoryCtrl.list)
.post(categoryCtrl.create);

router.param('categoryId', categoryCtrl.categoryById);

export default router;