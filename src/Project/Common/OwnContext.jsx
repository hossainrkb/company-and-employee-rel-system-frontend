class OwnContext {
  constructor(value) {
    this.value = value;
  }
  Provider = ({children,value}) => {
    this.value = value;
    return children;
  };
  Consumer = ({ children }) => {
    return children(this.value);
  };

}
function createContext(value = null) {
  const context = new OwnContext(value);
  return {
    Provider: context.Provider,
    Consumer: context.Consumer,
  };
}
export default createContext;
