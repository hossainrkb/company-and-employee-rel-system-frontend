import React, { Component } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import OwnCustomForm from "../../../Common/Form";
import Input from "../../../Common/Input";
import { add_company,update_company } from "../../../Service/companyService";
class AddCompany extends OwnCustomForm {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        username: "",
        password: "",
        email: "",
        subscription_start: "",
        subscription_end: "",
        subscription_fee: "",
      },
      errors: {
        name: "",
        username: "",
        password: "",
        email: "",
        subscription_start: "",
        subscription_end: "",
        subscription_fee: "",
      },
      isUpdateInfo: false,
    };
  }
  handleValidation = (name, value) => {
    if (name == "subscription_end") {
      if (value.trim() == "") return "Subscription end must not be empty";
    }
    if (name == "subscription_start") {
      if (value.trim() == "") return "Subscription start must not be empty";
    }
    if (name == "email") {
      if (value.trim() == "") return "Company email must not be empty";
    }
    if (name == "name") {
      if (value.trim() == "") return "Company Name must not be empty";
    }
    if (name == "username") {
      if (value.trim() == "") return "User Name must not be empty";
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
      let data = await add_company(this.state.data);
      let { data: parseData } = data;
      if (parseData.status == "ok") {
        let { data: finalData } = parseData;
        this.props.storeCompany(this.state.data, finalData.id);
        this.props.history.push("/admin/company");
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
  }
  render() {
    const {
      username,
      password,
      email,
      name,
      subscription_start,
      subscription_end,
      subscription_fee,
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
                    {this.state.isUpdateInfo ? "Update" : "Add"} Comapny
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={this.handleFormSubmit}>
                    <Row>
                      <Col className="pr-1" md="5">
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
                      <Col className="px-1" md="3">
                        <Input
                          type="text"
                          label="Username"
                          id="username"
                          name="username"
                          value={username}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                      <Col className="pl-1" md="4">
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
                          label="Company Password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <Input
                          type="date"
                          label="Subscription Start"
                          id="subscription_start"
                          name="subscription_start"
                          value={subscription_start}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                      <Col className="px-1" md="3">
                        <Input
                          type="date"
                          label="Subscription End"
                          id="subscription_end"
                          name="subscription_end"
                          value={subscription_end}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                      <Col className="pl-1" md="4">
                        <Input
                          type="number"
                          label="Subscription Fee"
                          id="subscription_fee"
                          name="subscription_fee"
                          value={subscription_fee}
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
                        Add Company
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
export default withRouter(AddCompany);
