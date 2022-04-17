import React, { Component, createRef } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import OwnCustomForm from "../../../Common/Form";
import CompanyDefaultForm from "./CompanyDefaultForm";
import { add_company, update_company } from "../../../Service/companyService";
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
      }
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
      let data = await update_company(
        this.state.data,
        this.props.match.params.id
      );
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
        let { list: allList } = parseData;
        this.props.storeCompany(allList, finalData.id);
        this.props.history.push("/admin/company");
      }
    }
  };
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
                    <CompanyDefaultForm
                      username={username}
                      password={password}
                      email={email}
                      name={name}
                      subscription_start={subscription_start}
                      subscription_end={subscription_end}
                      subscription_fee={subscription_fee}
                      errors={errors}
                      handleOnChange={this.handleOnChange}
                    />
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Add Company
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
export default withRouter(AddCompany);
