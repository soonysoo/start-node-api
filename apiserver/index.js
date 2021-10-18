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
let kernelData;

//kernel 정보 전달 
app.get('/resource/kernel', function(req, res){
  let fileData = fs.readFileSync('D:\\CTI_신한생명_TM\\Cfg\\cfg_kernel.json','utf8');
  kernelData = JSON.parse(fileData);
  //res.header("Access-Control-Allow-Origin", "*");
  res.json(kernelData);
  //res.json(kernelData);
})

//kernel 정보 수정
app.post('/resource/kernel',(req, res) => {
  const key = req.body.key;
  const value = req.body.value;

  //if(!kernelData) return res.status(404).end();
  kernelData[key] = value;
  kernelData['update_config'] = 1;
  console.log(kernelData);

  res.status(201).json(user);
})

app.listen(3040, function () {
  console.log('Example app listening on port 3040!');
}); 

module.exports = app; 