import express from 'express';
import postCtrl from '../controllers/post.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/posts')
.get(postCtrl.list)
.post(postCtrl.create);

router.route('/api/posts/:postId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

  router.param('userId', postCtrl.postById);

export default router;