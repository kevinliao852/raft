export const createRandomTimeout = ()=>{
  let timeout;
  while(true){
    timeout = Math.floor(Math.random()*1000) %1000;
    if(timeout > 500) break;
  }
  return timeout
}
