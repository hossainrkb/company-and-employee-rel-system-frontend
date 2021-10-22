import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
    };
  }
  handleOnChange = (e) => {
    let data = { ...this.state.data };
    let errors = { ...this.state.errors };
    data[e.target.name] = e.target.value;
    let validation_errors = this.handleValidation(
      e.target.name,
      e.target.value
    );
    errors[e.target.name] = validation_errors;
    this.setState({ data, errors });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.doSubmit(e);
  };
}
export default Form;
