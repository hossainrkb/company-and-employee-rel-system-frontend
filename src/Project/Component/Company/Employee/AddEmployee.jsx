import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import OwnCustomForm from "../../../Common/Form";
import Input from "../../../Common/Input";
import { add_employee,update_employee } from "../../../Service/employeeService";
class AddEmployee extends OwnCustomForm {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        password: "",
        email: "",
        companyId:""
      },
      errors: {
        name: "",
        password: "",
        email: ""
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
    if (this.props.match.params.id) {
      let data = await update_company(this.state.data,this.props.match.params.id);
      let { data: parseData } = data;
      if (parseData.status == "ok") {
      this.props.updateCompany(this.state.data, this.props.match.params.id);
      this.props.history.push("/company");
      }
    } else {
      let data = await add_employee(this.state.data,this.state.data.documentID);
      let { data: parseData } = data;
      if (parseData.status == "ok") {
        let { data: finalData } = parseData;
        this.props.storeEmployeeState(this.state.data, finalData.employee.id);
        this.props.history.push(`/company/${this.state.data.documentID}/employee`);
      }
    }
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      let company = this.props.showCompany(this.props.match.params.id);
      let companyDetail = {
        id: this.props.match.params.id,
        name: company.name,
        username: company.username,
        password: company.password,
        email: company.email,
        subscription_start: "",
        subscription_end: "",
        subscription_fee: company.sub_fee,
      };
      this.setState({ data: companyDetail, isUpdateInfo: true });
    }
    if (this.props.match.params.documentID) {
      let newData = {...this.state.data,documentID:this.props.match.params.documentID};
      this.setState({ data: newData });
    }
  }
  render() {
    const {
      password,
      email,
      name,
    } = this.state.data;
    const { errors } = this.state;
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">
                    {this.state.isUpdateInfo ? "Update" : "Add"} Employee
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
                    {this.state.isUpdateInfo ? (
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Update Company
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
export default withRouter(AddEmployee);
