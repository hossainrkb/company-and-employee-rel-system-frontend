import AdminLoginCredentialContext from "../Common/AdminLoginCredentialContext";
import {raiseAdminToken} from './tokenService';
export function getAdminHeaders(){
    let token = null;
    let ALC = AdminLoginCredentialContext;
    if(ALC.GetToken()!=null){
      token = (ALC.GetToken()).token
    }else{
      token = raiseAdminToken()
      AdminLoginCredentialContext.SetToken({ token });
    }
    let header = {
      headers:{
        "Authorization" :"Bearer " + token
      }
    }
    return token? header:null;
  }