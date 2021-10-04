const express = require('express');
const app = express();  //여기서 app을 어플리케이션이라고 합니다

function commonmw(req, res, next){
    console.log('commonmv');
    next(new Error('error ouccered'));
}

function errormw(err, req, res, next){
    console.log(err.message); 
    //전달받은 에러 출력 및 결과처리
    next();
}

app.use(commonmw);
app.use(errormw);

app.listen(3030, function(){
    console.log('server is running')
})