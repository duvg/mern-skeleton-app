import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

//// Permite acceder a las imágenes desde una url publica //

router
  .route('/api/users/defaultphoto') /// Se agg defaultphoto////
  .get(userCtrl.defaultPhoto) /// se agg.get(userCtrl.defaultPhoto)///
router
  .route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

  ///Permite ejecutar la funcionalidad de seguir usuarios///
router
  .route('/api/users/follow')
  .put(
    authCtrl.requireSignin,
    userCtrl.addFollowing,
    userCtrl.addFollower
  );

  ///Permite ejecutar la funcionalidad para dejar de seguir///
  router
  .route('/api/users/unfollow')
  .put(
    authCtrl.requireSignin,
    userCtrl.addFollowing,
    userCtrl.addFollower
  );


router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.update
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userCtrl.remove
  );

router.param('userId', userCtrl.userById);

export default router;
