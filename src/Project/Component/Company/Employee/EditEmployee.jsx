import React, { Component } from "react";
import Form from "Project/Common/Form";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import {
  edit_employee,
  update_employee,
} from "../../../Service/employeeService";
import EmployeeDefaultForm from "./EmployeeDefaultForm";
class EditEmployee extends Form {
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
      },
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
    let { documentID: company_id, employeeID: employee_id } =
      this.props.match.params;
    let data = await update_employee(this.state.data, company_id, employee_id);
    let { data: parseData } = data;
    if (parseData.status && parseData.status == "ok") {
      this.props.history.push(`/company/${company_id}/employee`);
    } else if (parseData.status && parseData.status == "error") {
      alert(parseData.message);
    }
  };
  async componentDidMount() {
    let { documentID: company_id, employeeID: employee_id } =
      this.props.match.params;
    let { data } = await edit_employee(company_id, employee_id);
    if (data && data.status && data.status == "ok") {
      let employee = data.data;
      let updatedPrevEmp = {
        ...this.state.data,
        email: employee.email,
        name: employee.name,
        password: employee.password,
      };
      this.setState({
        data: updatedPrevEmp,
      });
    }
  }
  render() {
    const { name, email, password } = this.state.data;
    const { errors } = this.state;
    return (
      <Container fluid>
        <Card className="p-2">
         <Row>
           <Col md="12">
            <Card.Title as="h4">Update Employee</Card.Title>
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
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                >
                  Update Employee
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
export default withRouter(EditEmployee);
