class AdminLoginCredentialContext {
  static value = null;
 static SetToken = (value) => {
    if (this.GetToken() ==null) {
      this.value = value;
      return true;
    }else{
      return false;
    }
  };
  static GetToken = () => {
    return this.value;
  };
}
export default AdminLoginCredentialContext;
