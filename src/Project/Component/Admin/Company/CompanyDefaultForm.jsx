import React, { useEffect, useRef } from "react";
import Input from "../../../Common/Input";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
const CompanyDefaultForm = (props) => {
  const focusFiled = useRef(null);
  useEffect(() => {
    focusFiled.current.focus();
  }, []);
  const {
    username,
    password,
    email,
    name,
    subscription_start,
    subscription_end,
    subscription_fee,
    handleOnChange,
    errors,
  } = props;
  return (
    <>
      <Row>
        <Col className="pr-1" md="5">
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
        <Col className="px-1" md="3">
          <Input
            type="text"
            label="Username"
            id="username"
            name="username"
            value={username}
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};
export default CompanyDefaultForm;
