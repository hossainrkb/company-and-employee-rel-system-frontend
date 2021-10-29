import AdminLoginCredentialContext from "../Common/AdminLoginCredentialContext";
const AdminLoginCredentialContextObj = new AdminLoginCredentialContext
export function getAdminHeaders(){
    let token = null;
    if(AdminLoginCredentialContextObj.GetToken()!=null){
      token = (AdminLoginCredentialContextObj.GetToken()).token
    }else{
      token = localStorage.getItem("accessTokenAdmin");
    }
    let header = {
      headers:{
        "Authorization" :"Bearer " + token
      }
    }
    return token? header:null;
  }