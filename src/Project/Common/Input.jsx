const Input = ({ type, value, name, onChange, id, label, errors }) => {
    return (
      <>
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          autoFocus
          type={type}
          onChange={onChange}
          value={value}
          className="form-control"
          id={id}
          name={name}
          aria-describedby="emailHelp"
        />
        {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
      </>
    );
  };
  
  export default Input;
  