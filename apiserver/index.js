var express = require('express'); //모듈가지고 오기
var app = express(); // 할당
var morgan = require('morgan');

var users = [
    { id: 1, name:'주하'},
    { id: 2, name:'민하'},
    { id: 3, name:'세하'},
];

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//사용자 목록 조회 API
app.get('/users', function (req, res) {
  req.query.limit = req.query.limit || 10 ;
  const limit = parseInt(req.query.limit,10);
  if(Number.isNaN(limit)){
    //end()함수로 응답을 진행해준다. 
    return res.status(400).end();
  }
  res.json(users.slice(0,limit));
});

//사용자 조회 API 
app.get('/users/:id', function(req, res){
    const id = parseInt(req.params.id, 10) //10진법 
    if(Number.isNaN(id)) return res.status(400).end();

    const user =  users.filter((user)=> user.id === id)[0];
    if(!user) return res.status(404).end();    
    res.json(user);
});

app.delete('/users/:id', (req, res) =>{
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();
  users = users.filter(user => user.id !==id);
  res.status(204).end();
})

app.post('/users', (req, res) => {
  //express는 body를 지원하지 않음.
  //bodyparser 필요
  const name = req.body.name;
  
  if(!name) return res.status(400).end();

  //중복된 데이터인지 확인
  const isConflict = users.filter(user => user.name === name).length;
  if(isConflict) return res.status(409).end();

  const id = Date.now();
  const user = {id, name};
  users.push(user);
  res.status(201).json(user);
})

app.put('/users/:id', (req, res) =>{
  const id  = parseInt(req.params.id , 10);
  //id가 정수인지 아닌지
  if(Number.isNaN(id)) return res.status(400).end();
  
  
  const name = req.body.name;
  // 실패 테스트 - 이름이 없는 경우 
  if(!name) return res.status(400).end();

  //user 중복이 되는지 확인
  const isConfilct = users.filter(user => user.name === name).length;
  if(isConfilct) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if(!user) return res.status(404).end();
  user.name = name;
  
  res.json(user);
})

app.listen(3040, function () {
  console.log('Example app listening on port 3030!');
}); 

module.exports = app;  //객체를 할당  