import express from "express";
import productCtrl from '../controllers/product.controller';

const router = express.Router();

router.route('/api/products')
.get(productCtrl.list)
.post(productCtrl.create);

router.param('productId', productCtrl.productById);

export default router;