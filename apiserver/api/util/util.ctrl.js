var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var os = require('os-utils');
const disk = require('diskusage');
const { spawn } = require("child_process").spawn;

const svcRestart = (filepath) => {
  // const command ;
  // execSync()

  // exec() 
}

const svcStop = () => {
  const bat  = spawn('cmd.exe', ['/c', 'my.bat'])

  // const process = exec('cd');

  // process.stdout.on('data', function(data){
  //   console.log(data.toString());
  // })
  // // 표준 에러
  // process.stderr.on("data", function (data) {
  //   console.error(data.toString()); // 버퍼 형태로 전달됩니다.
  // });
  //1번 방법
  // const option = {
  //   env : 'C:\\Windows\\System32'
  // }
  // const command = spawn('sc stop CTIBridge_SH_TM', option);
  
  // command.stdout.on('data', function(data){
  //   console.log(`stdout is ${data.toString}`)
  // })

  // command.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });

  // command.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });

  //2번 방법
  // exec(command, function(err, stdout, stderr){
  //   if(err){
  //     console.log("err")
  //     console.error(err);
  //     return;
  //   }else if(stderr.length>0){
  //     console.log("stderr")
  //     console.log(stderr);
  //     return;
  //   }
  //   console.log("stdout");
  //   console.log(stdout);
  // });

  //console.log(stdout);
}

const svcStart = () => {
  console.log("command 시작 ")
  const command ='sc start CTIBridge_SH_TM';
  console.log("command 시작 ")
  const stdout = execSync(command);
  console.log("stdout 시작")
  console.log(stdout);

}

const showCPU = async(req, res) =>{
  let cpuUsage = 0;
  let data = {};
  data.totalMemory = await ((os.totalmem()/1000)).toFixed(0);
  data.memoryPer   = await (os.freememPercentage()).toFixed(2);

  await os.cpuUsage((v) => {
    data.cpuUsage = v.toFixed(2);
    res.json(data);
  });
}

const showMEM = (rep, res) => {
  console.log('시스템의 메모리 : %d / %d', os.freemem(), os.totalmem());
  const total = os.totalmem();     // 시스템의 총 메모리
  const free = os.freemem();     // 시스템의 가용 메모리
  const perUsable = (os.totalmem() - os.freemem()) / os.totalmem();
  const data = {
    total,
    free,
    perUsable
  }
  res.json(data);
}

const showDisk = (rep, res) => {
   let diskObj = {};

  disk.check('c:', function(err, info) {
    if (err) {
      console.log(err);
    } else {
      diskObj.C = 
        [
          convertByteToGB(info.total),
          convertByteToGB(info.available),
          (info.available/info.total).toFixed(2)
        ]
    }
  });

  disk.check('d:', function(err, info) {
    if (err) {
      console.log(err);
    } else {
      diskObj.D = 
         [
          convertByteToGB(info.total),
          convertByteToGB(info.available),
          (info.available/info.total).toFixed(2)
        ]
    }
  });

  disk.check('e:', function(err, info) {
    if (err) {
      console.log(err);
    } else {
      diskObj.E = 
        [
          convertByteToGB(info.total),
          convertByteToGB(info.available),
          (info.available/info.total).toFixed(2)
        ]
    }
  });
  res.json(diskObj);
}

const convertByteToGB = (byte) => {
  return (byte/ (1000 * 1000 * 1000)).toFixed(2);
}

module.exports = {
  svcRestart : svcRestart,
  svcStop : svcStop,
  svcStart : svcStart,
  showCPU : showCPU,
  showMEM : showMEM,
  showDisk : showDisk
}