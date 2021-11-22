import AdminLoginCredentialContext from "../Common/AdminLoginCredentialContext";
import {raiseAdminToken} from './tokenService';
const AdminLoginCredentialContextObj = new AdminLoginCredentialContext
export function getAdminHeaders(){
    let token = null;
    if(AdminLoginCredentialContextObj.GetToken()!=null){
      token = (AdminLoginCredentialContextObj.GetToken()).token
    }else{
      token = raiseAdminToken()
    }
    let header = {
      headers:{
        "Authorization" :"Bearer " + token
      }
    }
    return token? header:null;
  }