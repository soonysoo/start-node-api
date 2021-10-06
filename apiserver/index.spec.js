const app = require('./index');
const should =  require('should');
const request = require('supertest');

describe('GET /users는 ', () =>{
    describe('성공시', ()=>{
        it('유저 객체를 담은 배열로 응답한다',(done)=>{   
            request(app)
                .get('/users')
                .end((err, res)=>{
                    // 받은 배열 값을 검증한다
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })
        it('최대 limit갯수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                })
        })
        describe('실패시', ()=>{
            it('limit이 숫자가 아니면 400을 응답한다',(done)=>{
                request(app)
                    .get('/users?limit=two')
                    .expect(400) //400응답 값을 기대한다. 
                    .end(done);
            })
        })
    })
})


describe('GET users/1는 ', () =>{
    describe('성공시', () =>{
        it('id가 1인 유저 객체를 반환한다',(done) =>{
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    //첫번째 파라미더 기대하는 ID , 
                    //두번째 파리미터 기대하는 값
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    })
  })