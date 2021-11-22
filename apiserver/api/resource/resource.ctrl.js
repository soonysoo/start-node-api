var fs = require('fs');


let kernelData = new Array();
let jsonData = new Object();

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

    //console.log(JSON.stringify(jsonData));
    fs.writeFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_kernel.json'
      , JSON.stringify(jsonData),'utf8',function(error){
        console.log(error); 
      })
      const updateStr = `[UPDATE]
      update_config	=1
      update_vdn	=0`
    fs.writeFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_update.ini', updateStr,'utf8',function(e){
      console.log(e);
    })  

    res.status(200).end();
  }

const showVDN = function(req, res){
  fs.readFile('D:\\CTI_SHLIFE_TM\\Cfg\\cfg_vdn_list.json','utf8', 
    function(err, result){
      jsonData = JSON.parse(result);
      console.log(jsonData);
      res.json(jsonData.vdn_list); 
    })
  }
// VDN 삭제 API
// const deleteVDN = function(req, res){
//   if(!jsonData.length) return res.status(406).end()
  
  


// }

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

const addIVR = function(req, res){
  console.log(req);
  console.log(req.params);
  //const 
  res.status(200).end();
}

module.exports = {
  showKernel : showKernel,
  updataKernel : updataKernel,
  showVDN : showVDN,
  showIVR : showIVR,
  addIVR : addIVR
}