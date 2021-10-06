var express = require('express'); //모듈가지고 오기
var app = express(); // 할당
var morgan = require('morgan');

var users = [
    { id: 1, name:'주하'},
    { id: 2, name:'민하'},
    { id: 3, name:'세하'},
];

app.use(morgan('dev'));


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
    const user =  users.filter((user)=> user.id === id)[0];
    res.json(user);
});

app.listen(3040, function () {
  console.log('Example app listening on port 3030!');
}); 

module.exports = app;  //객체를 할당  