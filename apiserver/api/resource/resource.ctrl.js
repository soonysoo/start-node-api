var fs = require('fs');


let KernelData = new Object();
let VDNData = new Object();
let IVRData = new Object();
let WebConfig = new Object();


(() => {
  fs.readFile('D:\\CTIAdmin\\cti_web_config.json','utf8',
    function(err, result){
      WebConfig =  JSON.parse(result);
      console.log(WebConfig);
    }
  )
})();

const showKernel  = function(req, res){
  let  _KernelData= [];
  console.log(`WebConfig ${WebConfig.root_path}`);
  fs.readFile(`${WebConfig.root_path}cfg_kernel.json`,'utf8', 
    function(err, result){
      console.log(JSON.parse(result));
      KernelData = JSON.parse(result);
      Object.keys(KernelData).forEach((k) =>{  
        _KernelData.push({
          key : k,
          value : KernelData[k],
          ischange : false
        })
      })
      console.log(req.params.path);
      res.json(_KernelData); 
    })
  }

const updataKernel = function(req, res){
    const key  = req.body.key;
    const value = req.body.value;
    
    if(!key || !value) return res.status(405).end();
    
    
 KernelData[key] = value
    
 KernelData['update_config'] = "1";

    fs.writeFile(`${WebConfig.root_path}cfg_kernel.json`
      , JSON.stringify(
     KernelData,null,4),'utf8',function(error){
        console.log(error); 
      })

    updateIni("CONFIG");
    res.status(200).end();
  }

const showVDN = function(req, res){
  fs.readFile(`${WebConfig.root_path}cfg_vdn_list.json`,'utf8', 
    function(err, result){
      VDNData = JSON.parse(result);
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

  fs.writeFile(`${WebConfig.root_path}cfg_vdn_list.json`
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

  //없는 VDN인 경우
  const isEmpty = VDNData.vdn_list.filter(list => list.vdn_no === vdnID).length;
  if(!isEmpty) return res.status(409).send("존재하지 않는 VDN입니다. ").end();

  const vdnList =  VDNData.vdn_list.filter(list => list.vdn_no !== vdnID);
  
  VDNData.vdn_list = vdnList;

  fs.writeFile(`${WebConfig.root_path}cfg_vdn_list.json`
  , JSON.stringify(VDNData,null,4),'utf8',function(error){
    console.log(error); 
  })

  updateIni("VDN");

  res.json(vdnList).status(204).end();
}



const showIVR = function(req, res){
  fs.readFile(`${WebConfig.root_path}cfg_ivr_list.json`,'utf8', 
    function(err, result){
      let responseJSON = [];
      IVRData = JSON.parse(result);
      IVRData.ivr_list.forEach((ivr)=>{
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
  let newVDN = req.body.params.newVDN;
  
  if(newVDN==''){
    return res.status('400').send("빈 값이 입력되었습니다.").end();
  } 
  const VDNarray = newVDN.split(',');
  if(VDNarray.length!==2){
    return res.status('400').send("잘못된 값이 입력되었습니다").end();
  }
  const ivr_group = parseInt(VDNarray[0]);
  const count = parseInt(VDNarray[1]); 4
  
  if(isNaN(ivr_group) || isNaN(count)){
    return res.status('400').send("문자값이 입력되었습니다.").end();
  }
  
  IVRData.ivr_list.push({ivr_group : ivr_group.toString(), count : count.toString()})

   fs.writeFile(`${WebConfig.root_path}cfg_ivr_list.json`
  , JSON.stringify(IVRData, null, 4),'utf8',function(error){
    console.log(error); 
  })

  res.json(IVRData);
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

  fs.writeFile(`${WebConfig.root_path}cfg_update.ini`, str,'utf8',function(e){
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