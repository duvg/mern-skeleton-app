import express  from "express";
import deparmentCtrl from '../controllers/department.controller';
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route('/api/departments')
    .get(deparmentCtrl.list)
    .post(deparmentCtrl.create);

router.route('/api/departments/:departmentId')
    .get(authCtrl.requireSignin, deparmentCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, deparmentCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, deparmentCtrl.remove);

router.param('deparmentId', deparmentCtrl.deparmentById);

export default router;