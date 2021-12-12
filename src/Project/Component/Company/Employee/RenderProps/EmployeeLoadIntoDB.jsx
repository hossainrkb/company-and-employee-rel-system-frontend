import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import OwnCustomForm from "../../../../Common/Form";
import Input from "../../../../Common/Input";
class EmployeeLoadIntoDB extends OwnCustomForm {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        password: "",
        email: "",
        companyId: "",
      },
      errors: {
        name: "",
        password: "",
        email: "",
      },
      isUpdateInfo: false,
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
    this.props.storeMethod(this.state.data, this.props.match.params.employeeID);
  };
  async componentDidMount() {
    if (this.props.match.params.employeeID) {
      let { data } = await this.props.editEmployee();
      if (data && data.status && data.status == "ok") {
        let employee = data.data;
        let updatedPrevEmp = {
          ...this.state.data,
          email: employee.email,
          name: employee.name,
        };
        this.setState({
          data: updatedPrevEmp,
        });
      }
    }
  }
  render() {
    const { password, email, name } = this.state.data;
    const { errors } = this.state;
    const { employeeID } = this.props.match.params;
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">
                    {employeeID ? "Update" : "Add"} Employee
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={this.handleFormSubmit}>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Input
                          type="text"
                          label="Name"
                          id="name"
                          name="name"
                          value={name}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                      <Col className="px-1" md="6">
                        <Input
                          type="email"
                          label="Email address"
                          id="email"
                          name="email"
                          value={email}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <Input
                          type="password"
                          label="Employee Password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                    </Row>
                    {employeeID ? (
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Update Employee
                      </Button>
                    ) : (
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Add Employee
                      </Button>
                    )}
                    <div className="clearfix"></div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default EmployeeLoadIntoDB;
