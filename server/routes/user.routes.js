import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

  
  router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)
  
  router.route('/api/users/follow')
  .put(authCtrl.requireSignin,
    userCtrl.addFollowing,
    userCtrl.addFollewer)
    
    
    router.route('/api/users/unfollow')
    .put(authCtrl.requireSignin,
      userCtrl.remoteFollowing,
      userCtrl.remoteFollower)
      
      router.param('userId', userCtrl.userById);
      
      router.route('/api/users/:userId')
        .get(authCtrl.requireSignin, userCtrl.read)
        .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
        .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);
        
export default router;
