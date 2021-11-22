const express = require('express');
const router = express.Router();
const ctrl = require('./resource.ctrl');


router.get('/kernel', ctrl.showKernel);  //kernel config보여주기
router.put('/kernel', ctrl.updataKernel);//kernel update 하기
router.get('/vdn', ctrl.showVDN);   // showVDN
router.post('/vdn', ctrl.addVDN);
router.delete('/vdn/:id', ctrl.deleteVDN);
//router.delete('/vdn/:id', ctrl.deleteVDN)
router.get('/ivr', ctrl.showIVR);
router.post('/ivr/:channel', ctrl.addIVR);
// router.delete('/:id',ctrl.destory )//사용자 제거
// router.post('/', ctrl.create)//사용자 추가
// router.put('/:id', ctrl.update)

module.exports = router;