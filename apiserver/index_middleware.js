const express = require('express');
const morgan = require('morgan');
const app = express();  //여기서 app을 어플리케이션이라고 합니다

function logger(req, res , next){
    console.log('I am logger');
    next();
}

function logger2(req, res , next){
    console.log('I am logger2');
    next();
}

app.use(logger) 
app.use(logger2)
app.use(morgan('dev'))

app.listen(3030, function(){
    console.log('server is running')
})