var express = require('express'); //모듈가지고 오기
var app = express(); // 할당
var morgan = require('morgan');
var bodyparser = require('body-parser');
var cors = require('cors');
var user = require('./api/user')
var resource = require('./api/resource')
var util = require('./api/util')


if(process.env.NODE_ENV !=='test'){
  app.use(morgan('dev')); //서버 로그를 설정하는 부분
}

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

var corsOptions = {
  origin : "*",
  credentials : true,
}


//users로 들어오는 모든 api에 대해서는 user 모듈에서 담당한다.
app.use('/users', user)
//resource 로 들어오는 API는 모두 resource 모듈에서 담당한다
app.use('/resource', resource)
//util에서 들어오는 API는 모두 util에서 담당한다.
app.use('/util', util)

module.exports = app;  //객체를 할당  