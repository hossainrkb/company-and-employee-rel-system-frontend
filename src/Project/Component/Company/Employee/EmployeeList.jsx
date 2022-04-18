import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";
import DefaultTableComponent from "../../../Common/DefaultTableComponent";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import {
  all_employee,
  destroy_employee,
} from "../../../Service/employeeService";
import CompanyInfoContext from "../../Context/CompanyInfoContext";
const EmployeeList = (props) => {
  const [employee_list, setEmployee] = useState([]);
  const [default_sorted_col, setSortColumn] = useState({
    column: "name",
    order: "asc",
  });
  let { companyInfo: loginCompany } = useContext(CompanyInfoContext);

  useEffect(async () => {
    let employee_list_response = await all_employee(loginCompany.id);
    let {
      data: { data },
    } = employee_list_response;
    let { company: company_list, employees: employees_list } = data;
    setEmployee(employees_list);
  }, []);

  const editEmployee = (e, id) => {
    props.history.push(`/company/${loginCompany.id}/${id}/edit-employee`);
  };
  const deleteEmployee = async (e, id) => {
    if (!confirm("Are You Sure ? ")) return;
    let destroy_employee_response = await destroy_employee(loginCompany.id, id);
    let { data: destroy } = destroy_employee_response;
    if (destroy.status && destroy.status == "ok") {
      alert(destroy.message);
      let update_employee_list = employee_list.filter((e) => e.id != id);
      setEmployee(update_employee_list);
    }
  };
  let columns = [
    { path: "iteration", label: "SL", iteration: true },
    { path: "name", label: "Name", content: (item) => item.name },
    { path: "email", label: "Email", content: (item) => item.email },
    { path: "Action", label: "Action" },
  ];
  let actionButtonComapany = [
    {
      edit: {
        icon: "fa fa-edit",
        className: "text-info",
        onclickHandle: editEmployee,
      },
    },
    {
      delete: {
        icon: "fa fa-trash",
        className: "text-danger",
        onclickHandle: deleteEmployee,
      },
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Employee List</Card.Title>
            </Card.Header>
            <DefaultTableComponent>
              {{
                columns,
                actionButton: actionButtonComapany,
                default_sorted_col,
                data: employee_list,
              }}
            </DefaultTableComponent>
            <Card.Body className="table-full-width table-responsive px-0"></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default EmployeeList;
