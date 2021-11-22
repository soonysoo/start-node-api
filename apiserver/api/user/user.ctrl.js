//api controller코드
var users = [
  { id: 1, name:'주하'},
  { id: 2, name:'민하'},
  { id: 3, name:'세하'},
];

const index = function (req, res) {
  req.query.limit = req.query.limit || 10 ;
  const limit = parseInt(req.query.limit,10);
  if(Number.isNaN(limit)){
    //end()함수로 응답을 진행해준다. 
    return res.status(400).end();
  }
  res.json(users.slice(0,limit));
}

const show  = function(req, res){
  const id = parseInt(req.params.id, 10) //10진법 
  if(Number.isNaN(id)) return res.status(400).end();

  const user =  users.filter((user)=> user.id === id)[0];
  if(!user) return res.status(404).end();    
  res.json(user);
}

const destory = function(req, res) {
  const id = parseInt(req.params.id, 10);
  if(Number.isNaN(id)) return res.status(400).end();
  users = users.filter(user => user.id !==id);
  res.status(204).end();
}

const create = function (req, res) {
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
}

const update = function(req, res){
  const id  = parseInt(req.params.id , 10);
  //id가 정수인지 아닌지
  if(Number.isNaN(id)) return res.status(400).end();
  
  
  const name = req.body.name;
  console.log(name);
  // 실패 테스트 - 이름이 없는 경우 
  if(!name) return res.status(400).end();

  //user 중복이 되는지 확인
  const isConfilct = users.filter(user => user.name === name).length;
  if(isConfilct) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if(!user) return res.status(404).end();
  user.name = name;
  
  res.json(user);
}

module.exports = {
  index : index,
  show : show,
  destory : destory,
  create : create,
  update : update
};