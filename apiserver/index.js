var express = require('express'); //모듈가지고 오기
var app = express(); // 할당
var morgan = require('morgan');

var users = [
    { id:1, name:'주하'},
    { id:2, name:'민하'},
    { id:3, name:'세하'},
];

app.use(morgan('dev'));

app.get('/users', function (req, res) {
  res.json(users);
});


app.listen(3040, function () {
  console.log('Example app listening on port 3030!');
}); 

module.exports = app;  //객체를 할당 