import React, { Component } from "react";
import Form from "Project/Common/Form";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import { add_employee } from "../../../Service/employeeService";
import EmployeeDefaultForm from "./EmployeeDefaultForm";
class AddEmployee extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        password: "",
        email: "",
      },
      errors: {
        name: "",
        password: "",
        email: "",
      }
    };
  }
  handleValidation = (name, value) => {
    if (name == "email") {
      if (value.trim() == "") return "Employee email must not be empty";
    }
    if (name == "name") {
      if (value.trim() == "") return "Employee Name must not be empty";
    }
    if (name == "password") {
      if (value.trim() == "") return "Password field must not be empty";
    }
    return "";
  };
  doSubmit = async (e) => {
    let data = await add_employee(this.state.data,this.props.match.params.documentID);
    let { data: parseData } = data;
    if (parseData.status && parseData.status == "ok") {
      this.props.history.push(`/company/${this.props.match.params.documentID}/employee`);
    }else if(parseData.status && parseData.status == "error"){
      alert(parseData.message);
    }
  };
  render() {
    const { name, email, password } = this.state.data;
    const { errors } = this.state;
    return (
      <Container fluid>
        <Card className="p-2">
        <Row>
           <Col md="12">
            <Card.Title as="h4">Add Employee</Card.Title>
           </Col>
         </Row>
         <form onSubmit={this.handleFormSubmit}>
          <EmployeeDefaultForm
            password={password}
            email={email}
            name={name}
            errors={errors}
            handleOnChange={this.handleOnChange}
          />
          <Row>
            <Col md="12">
            <Button className="btn-fill pull-right" type="submit" variant="info">
            Add Employee
          </Button>
            </Col>
          </Row>
          <div className="clearfix"></div>
        </form>
        </Card>
      </Container>
    );
  }
}
export default withRouter(AddEmployee);
