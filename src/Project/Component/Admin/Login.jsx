import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

import OwnCustomForm from "../../Common/Form";
import Input from "../../Common/Input";
import { login } from "../../Service/adminService";
class AdminLogin extends OwnCustomForm {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        password: "",
        email: "",
      },
      errors: {
        password: "",
        email: "",
      },
    };
  }
  handleValidation = (name, value) => {
    if (name == "email") {
      if (value.trim() == "") return "Email must not be empty";
    }
    if (name == "password") {
      if (value.trim() == "") return "Password field must not be empty";
    }
    return "";
  };
  doSubmit = async (e) => {
    const email = e.target[0].value;
    const password = e.target[1].value;
    let errors = { ...this.state.errors };
    if (email == "" && password == "") {
      errors["email"] = "Email is empty";
      errors["password"] = "Password is empty";
      return this.setState({ errors });
    }
    if (email == "") {
      errors["email"] = "Email is empty";
      return this.setState({ errors });
    }
    if (password == "") {
      errors["password"] = "Password is empty";
      return this.setState({ errors });
    }
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", email);
    urlencoded.append("password", password);
    urlencoded.append("client_id", "4");
    urlencoded.append("scope", "*");
    urlencoded.append(
      "client_secret",
      "jdH6etdqVP0adl8dlGBgac9YcFm2kG8ZwLM1KBCw"
    );
    urlencoded.append("grant_type", "password");
   let data =  await login(urlencoded);
  //  window.location = "/company";
    this.props.history.push("/")
  };
  render() {
    const { password, email } = this.state.data;
    const { errors } = this.state;
    return (
      <>
        <Container fluid>
          <Row className="mt-5">
            <Col md="4">&nbsp;</Col>
            <Col md="4">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Admin Login</Card.Title>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={this.handleFormSubmit}>
                    <Row>
                      <Col md="12">
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
                      <Col md="12">
                        <Input
                          type="password"
                          label="Password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={this.handleOnChange}
                          errors={errors}
                        />
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Login
                    </Button>
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
export default AdminLogin;
