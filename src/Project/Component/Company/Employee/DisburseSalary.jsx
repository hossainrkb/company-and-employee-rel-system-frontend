import React, { useReducer } from "react";
import { useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Pagination from "../../../Common/Pagination.Component";
import {
  emp_stat_create,
  emp_salary_details,
  emp_salary_create_ssl_session,
} from "../../../Service/companyService";
import DatePicker from "react-datepicker";
let initBaseStat = {
  yearMonthDate: new Date(),
  employees: [],
  selectedEmp: "",
  emp_total_salary_status: [],
  activePage: 1,
  pageCount: 5,
  empSearched: false,
  current_month_total_salary_status: [],
  salary_type:[],
  selected_salary_type:"",
  selected_salary_amount:"",
  selected_salary_misc_details:"",
  selected_salary_accno:"",
  select_employee:{}
};
let emp_profile_style = {
  fontSize: "13px",
  margin: "0px",
};
const reducerBaseState = (prevState, action) => {
  switch (action.type) {
    case "monthyear":
      return { ...prevState, yearMonthDate: action.value };
      break;
    case "selectemp":
      return { ...prevState, selectedEmp: action.value };
      break;
    case "selerytype":
      return { ...prevState, selected_salary_type: action.value };
      break;
    case "seleryamount":
      return { ...prevState, selected_salary_amount: action.value };
      break;
    case "selerymisc":
      return { ...prevState, selected_salary_misc_details: action.value };
    case "seleryaccno":
      return { ...prevState, selected_salary_accno: action.value };
      break;
    default:
      return { ...prevState, ...action };
      break;
  }
};
const DisburseSalary = (props) => {
  let custom_button_css = {
    padding: "7px 35px",
    marginTop: "25px",
    border: "1px solid #1DC7EA",
    backgroundColor: "#1DC7EA",
    color: "#fff",
    borderRadius: "3px",
  };

  const [baseState, setBaseState] = useReducer(reducerBaseState, initBaseStat);
  const {
    yearMonthDate,
    employees,
    selectedEmp,
    emp_total_salary_status,
    pageCount,
    activePage,
    empSearched,
    current_month_total_salary_status,
    salary_type,
    selected_salary_amount,
    selected_salary_misc_details,
    selected_salary_accno,
    selected_salary_type,
    select_employee
  } = baseState;
  const handleEmployeeSearch = async () => {
    if (!yearMonthDate) {
      alert("Month Year Filed is not Valid");
      return;
    }
    if (!selectedEmp) {
      alert("Emp is not Valid");
      return;
    }
    let month =
      yearMonthDate.getMonth().toString().length == 1
        ? `0${yearMonthDate.getMonth()}`
        : yearMonthDate.getMonth();
    let year = yearMonthDate.getFullYear();
    let { data } = await emp_salary_details(
      props.match.params.documentID,
      selectedEmp,
      {
        month: ++month,
        year: year,
      }
    );
    if (data.status && data.status == "ok") {
      let {
        data: { total_salary_status },
        data: { current_month_total_salary_stat },
        data: { salary_type },
        data: { select_employee },
      } = data;
      sessionStorage.setItem(
        "emp_salary_stat_search",
        JSON.stringify({
          selectedEmp,
          month,
          year,
          yearMonthDate,
        })
      );
      setBaseState({
        selected_salary_accno: select_employee.acc_no?select_employee.acc_no:"",
        select_employee: select_employee,
        salary_type: salary_type,
        emp_total_salary_status: total_salary_status,
        empSearched: true,
        current_month_total_salary_status: current_month_total_salary_stat,
      });
    }
  };
  const disburseSalary = async () => {
    if (!confirm("Are You Sure ?")) return true;
    let month =
      yearMonthDate.getMonth().toString().length == 1
        ? `0${yearMonthDate.getMonth()}`
        : yearMonthDate.getMonth();
    let year = yearMonthDate.getFullYear();

    let req_data = {
      month: ++month,
      year: year,
      salary_type: selected_salary_type,
      salary_amount: selected_salary_amount,
      misc: selected_salary_misc_details,
      salary_status: "PENDING",
      acc_no: selected_salary_accno,
    };
    let { data } = await emp_salary_create_ssl_session(
      props.match.params.documentID,
      selectedEmp,
      req_data
    );
    console.log(data);
    window.location.href = data.GatewayPageURL;
  };
  useEffect(async () => {
    let { data } = await emp_stat_create(props.match.params.documentID);
    if (data.status == "ok") {
      let {
        data: { employees },
      } = data;
      setBaseState({ employees });
    }
  }, []);
  useEffect(async () => {
    let sessionStorageData = sessionStorage.getItem("emp_salary_stat_search");
    if (sessionStorageData) {
      let parse_data = JSON.parse(sessionStorageData);
      console.log(parse_data);
      let { data } = await emp_salary_details(
        props.match.params.documentID,
        parse_data.selectedEmp,
        {
          month: parse_data.month,
          year: parse_data.year,
        }
      );
      if (data.status && data.status == "ok") {
        let {
          data: { total_salary_status },
          data: { current_month_total_salary_stat },
          data: { salary_type },
          data: { select_employee },
        } = data;
        setBaseState({
          selected_salary_accno: select_employee.acc_no,
          select_employee: select_employee,
          salary_type: salary_type,
          emp_total_salary_status: total_salary_status,
          current_month_total_salary_status: current_month_total_salary_stat,
          empSearched: true,
          selectedEmp: parse_data.selectedEmp,
          yearMonthDate: new Date(parse_data.yearMonthDate),
        });
      }
    }
  }, []);

  const paginateDatas = (datas) => {
    let updateDatas = [];
    const start = (activePage - 1) * pageCount;
    updateDatas = datas.slice(start, start + pageCount);
    return updateDatas;
  };
  const handleClickePaginationPage = (e, page) => {
    setBaseState({ activePage: page });
  };
  const emp_salary_details_paginate = paginateDatas(emp_total_salary_status);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="12" sm="12">
            <Card className="card-stats">
              <div className="px-2 py-2 default_style_one">Disburse Salary</div>
              <Card.Body>
                <Row>
                  <Col md="1"></Col>
                  <Col md="4">
                    <div>Month - Year</div>
                    <DatePicker
                      required
                      dateFormat="MMMM yyyy"
                      showMonthYearPicker
                      className="form-control"
                      selected={yearMonthDate}
                      onChange={(date) =>
                        setBaseState({ type: "monthyear", value: date })
                      }
                    />
                  </Col>
                  <Col md="4">
                    <div>Employee</div>
                    <select
                      value={selectedEmp}
                      className="form-control"
                      onChange={(e) => {
                        setBaseState({
                          type: "selectemp",
                          value: e.target.value,
                        });
                      }}
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.email}
                          </option>
                        );
                      })}
                    </select>
                  </Col>
                  <Col md="2">
                    <button
                      style={custom_button_css}
                      onClick={() => handleEmployeeSearch()}
                    >
                      Search
                    </button>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
        {empSearched ? (
          <Row>
            <Col xs="8">
              <Card className="">
                <div className="px-2 py-2 default_style_one default_style_one">
                  Basic Salary History
                </div>
                <Card.Body>
                  <div style={{ overflow: "auto" }}>
                    <table className="table text-center">
                      <tr>
                        <td>Trx</td>
                        <td>Company</td>
                        <td>Month</td>
                        <td>Year</td>
                        <td>Amount</td>
                        <td>Type</td>
                        <td>Status</td>
                        <td>Currency</td>
                        <td>Details</td>
                      </tr>
                      {emp_salary_details_paginate.length > 0 ? (
                        emp_salary_details_paginate.map((e) => {
                          return (
                            <tr>
                              <td>
                                <p style={emp_profile_style}>{e.trx}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.company}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.month}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.year}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.amount}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.type}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.status}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.currency}</p>
                              </td>
                              <td>
                                <p style={emp_profile_style}>{e.details}</p>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={"9"}>No Record Found</td>
                        </tr>
                      )}
                    </table>
                    <Pagination
                      totalItems={emp_total_salary_status.length}
                      pageCount={pageCount}
                      activePage={activePage}
                      handleClickePage={handleClickePaginationPage}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="4">
              <Card className="">
                <div className="px-2 py-2 default_style_one default_style_one">
                  Summary{" "}
                  {current_month_total_salary_status.length > 0
                    ? " - " +
                      current_month_total_salary_status[0]["month"] +
                      " " +
                      current_month_total_salary_status[0]["year"]
                    : ""}
                </div>
                <Card.Body>
                  {current_month_total_salary_status.map((e) => {
                    return (
                      <>
                        <Card>
                          <Card.Body>
                            <div className="d-flex justify-content-between">
                              <div className="text-left">Trx</div>
                              <div style={emp_profile_style}>{e.trx}</div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="text-left">Amount</div>
                              <div style={emp_profile_style}>{e.amount}</div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="text-left">Type</div>
                              <div style={emp_profile_style}>{e.type}</div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="text-left">Status</div>
                              <div style={emp_profile_style}>{e.status}</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </>
                    );
                  })}
                  <input placeholder="Amount" type="number" value={selected_salary_amount}  onChange={(e) => {
                        setBaseState({
                          type: "seleryamount",
                          value: e.target.value,
                        });
                      }} required className="form-control" />
                  <br/>
                  <select
                      className="form-control"
                      onChange={(e) => {
                        setBaseState({
                          type: "selerytype",
                          value: e.target.value,
                        });
                      }}
                      required
                    >
                      <option value="">Select Type</option>
                      {salary_type.map((e) => {
                        return (
                          <option key={e.val} value={e.val}>
                            {e.text}
                          </option>
                        );
                      })}
                    </select>
                  <br/>
                  <input placeholder="Acc No" type="text" value={selected_salary_accno} readOnly onChange={(e) => {
                        setBaseState({
                          type: "seleryaccno",
                          value: e.target.value,
                        });
                      }} required className="form-control" />
                  <br/>
                  <textarea placeholder="Misc" type="number" value={selected_salary_misc_details}  onChange={(e) => {
                        setBaseState({
                          type: "selerymisc",
                          value: e.target.value,
                        });
                      }} required className="form-control" />
                  <br/>
                
                  <Button
                  disabled={!select_employee.acc_no?true:false}
                    onClick={() => {
                      disburseSalary();
                    }}
                    className={!select_employee.acc_no?'btn btn-info bg-info  btn-block':'btn btn-info btn-block'}
                  >
                    <i className="fa fa-industry"></i>
                    Disburse Salary
                  </Button>
                 
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};
export default DisburseSalary;
