import express from 'express';
import postCtrl from '../controllers/post.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/post')
  .get(postCtrl.list)
  .post(postCtrl.create);

  router.route('/api/post/like')
  .put(authCtrl.requireSignin,
    postCtrl.like)
    
    
    router.route('/api/post/unlike')
    .put(authCtrl.requireSignin,
      postCtrl.unLike)

    router.route('/api/post/comment')
    .post(authCtrl.requireSignin,
      postCtrl.comment,
      postCtrl.uncomment)

  router.param('postId', postCtrl.postById);
  router.route('/api/post/like')
  .get(authCtrl.requireSignin, postCtrl.read)
  
  router.route('/api/post/:postId')
    .get(authCtrl.requireSignin, postCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.remove);
export default router;
