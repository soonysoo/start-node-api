const express = require('express');
const router = express.Router();
const ctrl = require('./util.ctrl');


router.get('/restart', ctrl.svcRestart);
router.get('/stop', ctrl.svcStop);
router.get('/start', ctrl.svcStart);
router.get('/cpu', ctrl.showCPU);
router.get('/memory', ctrl.showMEM);
router.get('/disk', ctrl.showDisk);


// router.delete('/:id',ctrl.destory )//사용자 제거
// router.post('/', ctrl.create)//사용자 추가
// router.put('/:id', ctrl.update)

module.exports = router;