import express from 'express';
import postCtrl from '../controllers/post.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/posts')
.get(postCtrl.list)
.post(postCtrl.create);

router.route('/api/posts/comment')
.put(authCtrl.requireSignin,
  postCtrl.addComment);

router.route('/api/posts/like')
.put(authCtrl.requireSignin,
  postCtrl.addLike);

router.route('/api/posts/uncomment')
  .put(authCtrl.requireSignin,
    postCtrl.removeComment,
    postCtrl.removeLike)

router.route('/api/posts/:postId')
  .get(authCtrl.requireSignin, postCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.remove);

router.param('postId', postCtrl.postById);

export default router;