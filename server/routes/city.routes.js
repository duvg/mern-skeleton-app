import express  from "express";
import cityCtrl from '../controllers/city.controller';
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route('/api/cities')
    .get(cityCtrl.list)
    .post(cityCtrl.create);

router.route('/api/cities/:cityId')
    .get(authCtrl. requireSignin, cityCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, cityCtrl.update)
    .delete(authCtrl.requireSigninm, authCtrl.hasAuthorization, cityCtrl.remove);

router.param('cityId', cityCtrl.cityById);

export default router;