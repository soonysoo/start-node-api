const app = require('./index_temp');
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

describe('실패시', ()=>{
    it('id가 숫자가 아닐경우 400으로 응답한다', (done)=>{
        request(app)
            .get('/users/one')
            .expect(400)
            .end(done)
    });
    it('id로 유저를 찾을 수 없을 경우 404로 응답한다',(done)=>{
        request(app)
            .get('/users/999')
            .expect(404)
            .end(done)
    });
})

describe('Delete /users/1', ()=>{
    describe('성공시', ()=>{
        it('204를 응답한다',(done)=>{
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })
})

describe('실패시', () =>{
    it('id가 숫자가 아닐경우 400으로 응답한다',done =>{
        request(app)
            .delete('/users/one')
            .expect(400)
            .end(done);
    })
})

describe('POST /users',()=>{
    describe('성공시',() =>{
        let name = 'daniel'
        let body;
        //테스트가 동작하기 전에 미리 실행
        before(done => {
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err,res) =>{
                    body = res.body;
                    done();
                });
        }) 
        it('생성된 유저 객체를 반환한다', () => {
          body.should.have.property('id');
        });
        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', name)
        })
    })
    describe('실패시',()=>{
        it('name파라미터를 누락시 400을 반환한다',(done)=>{
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name이 중복일 경우 409을 반환한다', (done) =>{
            request(app)
                .post('/users')
                .send({name :'세하'})
                .expect(409)
                .end(done)
        })
    })
})


describe('PUT /users/:id', () => {
    describe('성공시', () => { 
        it('변경된 name을 응답한다', (done) => {
            const name = '심민하';
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name',name);
                    done();
                });
        })
    })

    describe('실패시', ()=>{
        it('정수가 아닌 id인 경우 400을 응답한다', done=>{
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        })
        it('name이 없을 경우 400을 응답한다', done=>{
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        })
        it('없는 유저일 경우', done=>{
            request(app)
                .put('/users/999')
                .expect(404)
                .end(done);
        })
        it('이름이 줌복일 경우', done=>{
            request(app)
                .put('/users/3')
                .send({name:'민하'})
                .expect(400)
                .end(done);
        })
    })
})