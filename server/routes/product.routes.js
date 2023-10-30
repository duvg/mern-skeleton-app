import express from 'express';
import productCtrl from '../controllers/product.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/products')
  .get(productCtrl.list)
  .post(productCtrl.create);

  
  router.param('productId', productCtrl.productById);
  
  router.route('/api/products/:productId')
    .get(authCtrl.requireSignin, productCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.remove);
export default router;
