import {raiseEmployeeToken} from './tokenService';
export function getEmployeeHeaders(){
    let token = null;
      token = raiseEmployeeToken()
    let header = {
      headers:{
        "Authorization" :"Bearer " + token
      }
    }
    return token? header:null;
  }