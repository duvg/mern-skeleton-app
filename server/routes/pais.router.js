import express from "express";
import paisCtrl from '../controllers/pais.controller';

const router = express.Router();

router.route('/api/pais')
.get(paisCtrl.list)
.post(paisCtrl.create);

router.param('paisId', paisCtrl.paisById);

export default router;