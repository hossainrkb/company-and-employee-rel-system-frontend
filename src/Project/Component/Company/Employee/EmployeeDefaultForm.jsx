import React, { useEffect, useRef } from "react";
import Input from "../../../Common/Input";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
const EmployeeDefaultForm = (props) => {
  const focusFiled = useRef(null);
  useEffect(() => {
    focusFiled.current.focus();
  }, []);
  const {
    name,
    password,
    email,
    handleOnChange,
    errors,
  } = props;
  return (
    <>
      <Row>
        <Col className="" md="6">
          <Input
            ref={focusFiled}
            type="text"
            label="Name"
            id="name"
            name="name"
            value={name}
            onChange={handleOnChange}
            errors={errors}
          />
        </Col>
        <Col className="" md="6">
          <Input
            type="text"
            label="E-mail"
            id="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            errors={errors}
          />
        </Col>
      </Row>
      <Row>
        <Col className="" md="12">
          <Input
            type="password"
            label="Employee Password"
            id="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};
export default EmployeeDefaultForm;
