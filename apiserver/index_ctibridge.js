var express = require('express'); //모듈가지고 오기
var app = express(); // 할당
var morgan = require('morgan');
var fs = require('fs');
var cors = require('cors');
var router = express.Router();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

var corsOptions = {
  origin : "localhost:3000",
  credentials : true,
}

app.use(cors(corsOptions));

app.listen(3040, function () {
  console.log('Example app listening on port 3040!');
}); 

module.exports = app; 