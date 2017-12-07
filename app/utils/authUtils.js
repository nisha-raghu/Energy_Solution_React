function setToken(id) {
  this.token = id;
}

function getToken(){
  return this.token;
}

function setUserId(id){
  this.userId = id;
}

function getUserId(){
  return this.userId;
}

export default {
  setToken,getToken,setUserId,getUserId
}
