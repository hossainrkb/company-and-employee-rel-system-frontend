import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import {
  emp_stat_create,
  emp_stat_details,
} from "../../Service/companyService";
import Pagination from "../../Common/Pagination.Component";
let emp_profile_style = {
  fontSize: "13px",
  margin: "0px",
};
let custom_button_css = {
  padding: "7px 35px",
  marginTop: "25px",
  border: "1px solid #1DC7EA",
  backgroundColor: "#1DC7EA",
  color: "#fff",
  borderRadius: "3px",
};
class EmpStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
      },
      errors: {
        email: "",
      },
      activePage: 1,
      pageCount: 3,
      search_emp: {},
      search_emp_record: {},
      record_keys: [],
      employees: [],
      selectEmp: "",
      total_leave_application: "",
      total_approved_leave_application: "",
      total_decline_leave_application: "",
      total_pending_leave_application: "",
      yearMonthDate: new Date(),
    };
  }
  setYearMonthDate = (date) => {
    this.setState({ yearMonthDate: date });
  };
  handleEmpSelect = (e) => {
    let value = e.target.value;
    this.setState({ selectEmp: value });
  };
  handleEmployeeSearch = async () => {
    let { yearMonthDate, selectEmp } = this.state;
    if (!yearMonthDate) {
      alert("Month Year Filed is not Valid");
      return;
    }
    if (!selectEmp) {
      alert("Emp is not Valid");
      return;
    }
    let month =
      yearMonthDate.getMonth().toString().length == 1
        ? `0${yearMonthDate.getMonth()}`
        : yearMonthDate.getMonth();
    let year = yearMonthDate.getFullYear();
    let { data } = await emp_stat_details(
      this.props.id,
      selectEmp,
      ++month,
      year
    );
    let {
      data: { employee },
    } = data;
    let {
      data: { records },
    } = data;
    let {
      data: {
        leave_application: { total_decline_leave_application },
      },
    } = data;
    let {
      data: {
        leave_application: { total_approved_leave_application },
      },
    } = data;
    let {
      data: {
        leave_application: { total_leave_application },
      },
    } = data;
    let {
      data: {
        leave_application: { total_pending_leave_application },
      },
    } = data;
    this.setState({
      search_emp: employee,
      search_emp_record: records,
      record_keys: Object.keys(records),
      total_decline_leave_application: total_decline_leave_application,
      total_approved_leave_application: total_approved_leave_application,
      total_leave_application: total_leave_application,
      total_pending_leave_application: total_pending_leave_application,
    });
  };

  async componentDidMount() {
    let { data } = await emp_stat_create(this.props.id);
    if (data.status == "ok") {
      let {
        data: { employees },
      } = data;
      this.setState({
        employees: employees,
      });
    }
  }
  paginateDatas = (datas) => {
    const { activePage, pageCount } = this.state;
    const start = (activePage - 1) * pageCount;
    let updateDatas = [];
    updateDatas = datas.slice(start, start + pageCount);
    return updateDatas;
  };
  handleClickePaginationPage = (e, page) => {
    this.setState({ ...this.state, activePage: page });
  };
  render() {
    const { email } = this.state.data;
    const {
      errors,
      search_emp,
      search_emp_record,
      employees,
      record_keys,
      pageCount,
      activePage,
      total_decline_leave_application,
      total_approved_leave_application,
      total_leave_application,
      total_pending_leave_application,
    } = this.state;
    const paginateDatas = this.paginateDatas(record_keys);
    return (
      <>
        <Container fluid>
          <Row>
            <Col lg="12" sm="12">
              <Card className="card-stats">
                <div className="px-2 py-2">Employee Status</div>
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
                        selected={this.state.yearMonthDate}
                        onChange={(date) => this.setYearMonthDate(date)}
                      />
                    </Col>
                    <Col md="4">
                      <div>Employee</div>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          this.handleEmpSelect(e);
                        }}
                        required
                      >
                        <option value="">Select Employee</option>
                        {employees.map((e) => {
                          return <option value={e.id}>{e.email}</option>;
                        })}
                      </select>
                    </Col>
                    <Col md="2">
                      <button
                        style={custom_button_css}
                        onClick={() => this.handleEmployeeSearch()}
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
          {Object.keys(search_emp).length > 0 ? (
          <Row>
            <Col lg="12" sm="12">
              <Card className="card-stats p-2">
                <div>Employee Details</div>
                <Card.Body>
                  <Row>
                    <Col xs="3">
                      <Card className="p-2">
                        <div>Profile</div>
                        <hr />
                        {Object.keys(search_emp).length > 0 ? (
                          <>
                            <p style={emp_profile_style}>
                              Name- {search_emp.name}
                            </p>
                            <p style={emp_profile_style}>
                              Email- {search_emp.email}
                            </p>
                            <p style={emp_profile_style}>
                              Comapny Name- {search_emp.company.name}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                      </Card>
                      <Card className="p-2">
                        <div>Leave Status</div>
                        <hr />
                        {Object.keys(search_emp).length > 0 ? (
                          <>
                            <p style={emp_profile_style}>
                              Leave Application - {total_leave_application}
                            </p>
                            <p style={emp_profile_style}>
                              Approved - {total_approved_leave_application}
                            </p>
                            <p style={emp_profile_style}>
                              Declined - {total_decline_leave_application}
                            </p>
                            <p style={emp_profile_style}>
                              Pending - {total_pending_leave_application}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                      </Card>
                    </Col>
                    <Col xs="9">
                      <Card className="p-2">
                        <div>Attendance</div>
                        <hr />
                        <div className="table-responsive">
                          <table className="table text-center">
                            <tr>
                              <td>Day</td>
                              <td>Attend</td>
                              <td>Check In On</td>
                              <td>Check Out On</td>
                              <td>Total Hrs</td>
                              <td>Total Mins</td>
                              <td>Total Seconds</td>
                            </tr>
                            {paginateDatas.length > 0
                              ? paginateDatas.map((e) => {
                                  return (
                                    <tr>
                                      <td>
                                        <p style={emp_profile_style}>
                                          {search_emp_record[e].date}
                                        </p>
                                      </td>
                                      <td>
                                        {search_emp_record[e].checkIn ? (
                                          <i
                                            className="fas fa-check text-info"
                                            title="Check In"
                                          ></i>
                                        ) : (
                                          <i
                                            className="fas fa-times text-warning"
                                            title="Absent"
                                          ></i>
                                        )}
                                      </td>
                                      <td>
                                        <p style={emp_profile_style}>
                                          {search_emp_record[e].checkIn}
                                        </p>
                                      </td>
                                      <td>
                                        <p style={emp_profile_style}>
                                          {search_emp_record[e].checkOut}
                                        </p>
                                      </td>
                                      <td>
                                        <p style={emp_profile_style}>
                                          {search_emp_record[e].dayTotalHours}
                                        </p>
                                      </td>
                                      <td>
                                        <p style={emp_profile_style}>
                                          {search_emp_record[e].dayTotalMin}
                                        </p>
                                      </td>
                                      <td>
                                        <p style={emp_profile_style}>
                                          {search_emp_record[e].dayTotalSecond}
                                        </p>
                                      </td>
                                    </tr>
                                  );
                                })
                              : ""}
                          </table>
                          <Pagination
                            totalItems={record_keys.length}
                            pageCount={pageCount}
                            activePage={activePage}
                            handleClickePage={this.handleClickePaginationPage}
                          />
                        </div>
                      </Card>
                    </Col>
                  </Row>
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
  }
}
export default EmpStat;
