var fs = require('fs');


let kernelData = new Array();
let jsonData = new Object();
let VDNData = new Object();

const showKernel  = function(req, res){
  let jsonKernelData= [];
  fs.readFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_kernel.json','utf8', 
    function(err, result){
      jsonData = JSON.parse(result);
      Object.keys(jsonData).forEach((k) =>{
        jsonKernelData.push({
          key : k,
          value : jsonData[k],
          ischange : false
        })
      })
    console.log(req.params.path);
    res.json(jsonKernelData); 
    })
  }

const updataKernel = function(req, res){
    const key  = req.body.key;
    const value = req.body.value;
    //console.log(req);
    
    if(!key || !value) return res.status(405).end();
    
    jsonData[key] = value
    jsonData['update_config'] = "1";

    fs.writeFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_kernel.json'
      , JSON.stringify(jsonData,null,4),'utf8',function(error){
        console.log(error); 
      })

    updateIni("CONFIG");
    res.status(200).end();
  }

const showVDN = function(req, res){
  fs.readFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_vdn_list.json','utf8', 
    function(err, result){
      VDNData = JSON.parse(result);
      //console.log(VDNData);
      res.json(VDNData.vdn_list); 
    })
  }

//VDN 정보 추가 
const addVDN =  function(req, res){
  const newVDN = req.body;
  if(newVDN.vdn_no===''){
    console.log("vdn 추가 정보가 없습니다.")
    return res.status(400).send("VDN 정보를 입력하세요.").end();
  }

  //VDN 중복확인하기 
  const isConfilct = VDNData.vdn_list.filter(list => list.vdn_no === newVDN.vdn_no).length;
  if(isConfilct) return res.status(409).send("이미 존재하는 VDN입니다").end();
  VDNData.vdn_list.push(newVDN);

  fs.writeFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_vdn_list.json'
  , JSON.stringify(VDNData,null,4),'utf8',function(error){
    console.log(error); 
  })
  updateIni("VDN");

  res.json(VDNData.vdn_list);
}

// VDN 삭제 API
const deleteVDN = function(req, res){
  const vdnID = req.params.id;
  //vdn값이 없는 경우
  if(vdnID==='') return res.status(400).send("vdn값이 비었습니다").end();

  console.log(VDNData.vdn_list);
  //없는 VDN인 경우
  const isEmpty = VDNData.vdn_list.filter(list => list.vdn_no === vdnID).length;
  if(!isEmpty) return res.status(409).send("존재하지 않는 VDN입니다. ").end();

  const vdnList =  VDNData.vdn_list.filter(list => list.vdn_no !== vdnID);
  
  VDNData.vdn_list = vdnList;

  fs.writeFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_vdn_list.json'
  , JSON.stringify(VDNData,null,4),'utf8',function(error){
    console.log(error); 
  })

  updateIni("VDN");

  res.json(vdnList).status(204).end();
}



const showIVR = function(req, res){
  fs.readFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_ivr_list.json','utf8', 
    function(err, result){
      let responseJSON = [];
      jsonData = JSON.parse(result);
      //console.log(jsonData.ivr_list);
      jsonData.ivr_list.forEach((ivr)=>{
        try{
          const startId  = parseInt(ivr.ivr_group);
          const count  = parseInt(ivr.count)
          
          for(let i=0; i<count ; i++){
            responseJSON.push({
              'IVR' : startId+i+"",
              "monitoring": "true"
            });
          }
        }catch(err){
          console.log(err)
        }
      })
      res.json(responseJSON); 
    })
}
// IVR 채널 등록
const addIVR = function(req, res){
  console.log(req);
  console.log(req.body.params);
  const newVDN = req.body.params.newVDN;
  if(newVDN)
  
  res.status(200).end();
}

//IVR 채널 삭제
const deleteIVR = function(req, res){

}

const updateIni = (param) =>{
  let str = "";
  if(param === "CONFIG"){
    str = `[UPDATE]
    update_config	=1
    update_vdn	=0`
  }

  if(param === "VDN"){
    str = `[UPDATE]
    update_config	=0
    update_vdn	=1`
  }

  fs.writeFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_update.ini', str,'utf8',function(e){
    console.log(e);
  }) 
}

module.exports = {
  showKernel : showKernel,
  updataKernel : updataKernel,
  showVDN : showVDN,
  addVDN : addVDN,
  deleteVDN : deleteVDN,
  showIVR : showIVR,
  addIVR : addIVR
}