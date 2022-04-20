class EmployeeLoginCredentialContext {
  static value = null;
 static SetToken = (value) => {
      this.value = value;
      return true;
  };
  static GetToken = () => {
    return this.value;
  };
}
export default EmployeeLoginCredentialContext;
