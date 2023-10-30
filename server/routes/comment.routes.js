import express from 'express';
import commentCtrl from '../controllers/comment.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/comments')
  .get(commentCtrl.list) 
  .post(commentCtrl.create);
  
router.route('/api/comments/like')
.put(commentCtrl.addlikeComment);

router.route('/api/comments/unlike')
.put(commentCtrl.addunlikeComment);

router.route('/api/comments/:commentId')// Para editar, eliminar y actualizar
  .get(authCtrl.requireSignin, commentCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, commentCtrl.remove);

router.param('commentId', commentCtrl.commentById);

export default router;
