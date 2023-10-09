import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

//////Actualizaremos las rutas de auth para poder probar desde postman en el archivo routes/auth.routes//
router.route('/api/auth/signin')
  .post(authCtrl.signin);
router.route('/api/auth/signout')
  .get(authCtrl.signout);


// router.route('/auth/signin')
//   .post(authCtrl.signin);
// router.route('/auth/signout')
//   .get(authCtrl.signout);

export default router;
