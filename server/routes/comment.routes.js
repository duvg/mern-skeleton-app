import express from 'express';
import commentCtrl from '../controllers/comment.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/comments')
.post(commentCtrl.create)
.get(commentCtrl.list);

router.route('/api/comment/post')
.put(authCtrl.requireSignin,
  commentCtrl.addComment);


// router.route('/api/comment/like')
// .put(authCtrl.requireSignin,
//   commentCtrl.addLike);

// router.route('/api/posts/uncomment')
//   .put(authCtrl.requireSignin,
//     commentCtrl.removeComment,
//     commentCtrl.removeLike)

router.route('/api/comment/:commentId')
  .get(authCtrl.requireSignin, commentCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.remove);

router.param('commentId', commentCtrl.commentById);

export default router;