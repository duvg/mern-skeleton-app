import express from 'express';
import postCtrl from '../controllers/post.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/posts')
  .get(postCtrl.list) //Obtener el listado de usuarios
  .post(postCtrl.create);

  router.route('/api/posts/addcomment')
  .post(postCtrl.addCommentToPost);

  router.route('/api/posts/defaultphoto')
  .get(postCtrl.defaultPhoto);

  router.route('/api/posts/like') //dar like al post
  .put(postCtrl.addlikePost);
  
  router.route('/api/posts/unlike')// quitar el like al post
  .put(postCtrl.addunlikePost);
  
router.route('/api/posts/:postId')// Para editar, eliminar y actualizar
  .get(authCtrl.requireSignin, postCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.remove);

router.param('postId', postCtrl.postById);// A todas las rutas de usuarios con user_id, se encarga automaticamente de buscar esos usuarios por esa ruta.

export default router;
