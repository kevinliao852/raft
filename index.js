import { socket } from 'axon';

import Raft from './raft.js';
import {createRandomTimeout} from './utils.js'

const ReqSock = socket('req');
const Repsock = socket('rep');

const raftInstance = new Raft();
ReqSock.bind(4000);
Repsock.connect(4000);

console.log('req server&rep client bind')

let timeout = createRandomTimeout();

setInterval(()=>{

  // leader send heartbeat
  if(raftInstance.status === 'leader' || raftInstance.status === 'candidate'){
    ReqSock.send({
      from: raftInstance.status
    },(res)=>{
      if(res.count) {
        raftInstance.status = 'leader'
      }
    });
  }

  console.log(raftInstance.status);
}, 100);


let id = null;

Repsock.on('message', function(msg,reply){
  if(id){
    clearInterval(id);
    id= null;
  }
  const {from} = msg;

  if(raftInstance.status === 'leader') {
    return;
  }

  id = setInterval(()=>{
    raftInstance.status = 'candidate';
  },timeout); 

  if(from === 'leader'){
    raftInstance.status = 'follower'
  }

  if(from === 'candidate'){
    reply({
      'count': true
    })
  }
});



