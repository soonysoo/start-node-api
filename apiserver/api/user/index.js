const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl')
//라우팅 설정로직

router.get('/', ctrl.index);//사용자 목록 조회 API
router.get('/:id', ctrl.show);//사용자 조회 API 
router.delete('/:id',ctrl.destory )//사용자 제거
router.post('/', ctrl.create)//사용자 추가
router.put('/:id', ctrl.update)

module.exports = router;