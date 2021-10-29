class AdminLoginCredentialContext {
  value = null;
  SetToken = (value) => {
    if (this.GetToken() ==null) {
      this.value = value;
      return true;
    }else{
      return false;
    }
  };
  GetToken = () => {
    return this.value;
  };
}
export default AdminLoginCredentialContext;
