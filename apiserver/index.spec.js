const app = require('./index');
const request = require('supertest')

describe('GET /users는 ', () =>{
    //두번째 함수에서 슈퍼테스트 실행시킨다
    it('...',(done)=>{  //nodejs는 비동기로 돌기때문에 테스트가 끝나는 시점에 done을 호출해주기만 하면된다. 
        request(app)
            .get('/users')
            .end((err, res)=>{
                console.log(res.body)
                done();
            })
    })
})