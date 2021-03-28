export default class Raft
{
  status = 'candidate';
  term = 0;
  voteCount = 0;
  constructor(){
    
  } 
  get status(){
    return this.status;
  }
  set status(status){
    this.status = status;
  }
}