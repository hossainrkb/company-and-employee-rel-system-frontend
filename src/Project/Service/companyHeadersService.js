import {raiseCompanyToken} from './tokenService';
export function getCompanyHeaders(){
    let token = null;
      token = raiseCompanyToken()
    let header = {
      headers:{
        "Authorization" :"Bearer " + token
      }
    }
    return token? header:null;
  }