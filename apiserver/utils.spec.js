//js앞에 spec이 들어간것이 테스트 코드이다
//테스트 코드는 명세서 요구사항으로 보면된다
const utils = require('./utils');
//테스트 검증모드
const should = require('should');

//테스트 환경만들기
describe('utils.js 모듈의 Catitalize() 함수는 ', ()=>{
    it('문자열의 첫번쨰 문자를 대문자로 반환한다', ()=>{
        const result = utils.capitalize('hello');
        //테스트 코드의 가독성이 좋아진다.
        result.should.be.equal('Hello');
    })
})


