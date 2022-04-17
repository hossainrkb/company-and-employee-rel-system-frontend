import React, { PureComponent, useState, useEffect } from "react";
import _ from "lodash";
import DefaultTableComponent from "../../../Common/DefaultTableComponent";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { all_company, destroy_company } from "../../../Service/companyService";
const CompanyList = (props) => {
  const [company_list, setCompany] = useState([]);
  const [default_sorted_col, setSortColumn] = useState({
    column: "name",
    order: "asc",
  });

  useEffect(async () => {
    let company_list_response = await all_company();
    let { data: company_list } = company_list_response;
    if (company_list.status && company_list.status == "ok") {
      setCompany(company_list.data);
    }
  }, []);

  const editCompany = (e, id) => {
    props.history.push(`/edit-company/${id}`);
  };
  const deleteCompany = async (e, id) => {
    if (!confirm("Are You Sure ? ")) return;
    let destroy_company_response = await destroy_company(id);
    let { data: destroy } = destroy_company_response;
    if (destroy.status && destroy.status == "ok") {
      alert(destroy.message);
      let update_company_list = company_list.filter((e) => e.id != id);
      setCompany(update_company_list);
    }
  };
  let columns = [
    { path: "iteration", label: "SL", iteration: true },
    { path: "name", label: "Name", content: (item) => item.name },
    { path: "username", label: "UserName", content: (item) => item.username },
    { path: "email", label: "Email", content: (item) => item.email },
    { path: "Action", label: "Action" },
  ];
  let actionButtonComapany = [
    {
      edit: {
        icon: "fa fa-edit",
        className: "text-info",
        onclickHandle: editCompany,
      },
    },
    {
      delete: {
        icon: "fa fa-trash",
        className: "text-danger",
        onclickHandle: deleteCompany,
      },
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Company List</Card.Title>
            </Card.Header>
            <DefaultTableComponent>
              {{
                columns,
                actionButton: actionButtonComapany,
                default_sorted_col,
                data: company_list,
              }}
            </DefaultTableComponent>
            <Card.Body className="table-full-width table-responsive px-0"></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default CompanyList;
