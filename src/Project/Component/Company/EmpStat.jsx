import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import {
  emp_stat_create,
  emp_stat_details,
} from "../../Service/companyService";
import Pagination from "../../Common/Pagination.Component";
let emp_profile_style = {
  fontSize: "10px",
  margin: "0px",
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
      month: {},
      year: [],
      selectedMonth: "",
      selectedYear: "",
      total_leave_application: "",
      total_approved_leave_application: "",
      total_decline_leave_application: "",
      total_pending_leave_application: "",
    };
  }
  handleValidation = (name, value) => {
    if (name == "email") {
      if (value.trim() == "") return "Email must not be empty";
    }
    return "";
  };
  handleOnClick = (e, target, value) => {
    this.setState({ [target]: value });
  };
  handleOnChange = async (e) => {
    let { selectedMonth, selectedYear } = this.state;
    const email = e.target.value;
    let errors = { ...this.state.errors };
    if (selectedMonth == "") {
      errors["month"] = "Month Not Select";
      return this.setState({ errors });
    }
    if (selectedYear == "") {
      errors["year"] = "Year Not Select";
      return this.setState({ errors });
    }
    if (email == "") {
      errors["email"] = "Email Not Select";
      return this.setState({ errors });
    }
    let { data } = await emp_stat_details(
      this.props.id,
      email,
      selectedMonth,
      selectedYear
    );
    let {
      data: { employee },
    } = data;
    let {
      data: { records },
    } = data;
    let {
      data: {  leave_application:{total_decline_leave_application} },
    } = data;
    let {
      data: {  leave_application:{total_approved_leave_application} },
    } = data;
    let {
      data: {  leave_application:{total_leave_application} },
    } = data;
    let {
      data: {  leave_application:{total_pending_leave_application} },
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
        data: { month },
      } = data;
      let {
        data: { year },
      } = data;
      let {
        data: { employees },
      } = data;
    
      this.setState({
        month: month,
        year: year,
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
      month,
      year,
      selectedMonth,
      selectedYear,
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
                <Card.Body>
                  <Row>
                    <Col xs="4">
                      <Card.Title>
                        <p className="badge">Year</p>
                        <div>
                          {year.map((e) => {
                            return (
                              <div
                                className={
                                  selectedYear == e
                                    ? "float-left bg-warning text-white btn btn-lg"
                                    : "float-left bg-info text-white btn btn-lg"
                                }
                                style={{
                                  border: "1px solid white",
                                  padding: selectedYear == e ? "10px" : "5px",
                                  cursor: "pointer",
                                }}
                                onClick={(field) =>
                                  this.handleOnClick(field, "selectedYear", e)
                                }
                              >
                                {e}
                              </div>
                            );
                          })}
                        </div>
                      </Card.Title>
                    </Col>
                    <Col xs="8">
                      <Card.Title>
                        <p className="badge">Month</p>
                        <div>
                          {Object.keys(month).map((e) => {
                            return (
                              <div
                                className={
                                  selectedMonth == e
                                    ? "float-left bg-warning text-white btn btn-md"
                                    : "float-left bg-info text-white btn btn-md"
                                }
                                style={{
                                  border: "1px solid white",
                                  padding: selectedMonth == e ? "10px" : "5px",
                                }}
                                onClick={(field) =>
                                  this.handleOnClick(field, "selectedMonth", e)
                                }
                              >
                                {e}
                              </div>
                            );
                          })}
                        </div>
                      </Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12" sm="12">
              <Card className="card-stats p-2">
                <Card.Body>
                  <Row>
                    <Col xs="8">
                      <p>Emp Stat</p>
                      {Object.keys(search_emp).length > 0 ? (
                        <>
                          <p style={emp_profile_style}>{search_emp.name}</p>
                          <p style={emp_profile_style}>{search_emp.email}</p>
                          <p style={emp_profile_style}>
                            {search_emp.company.name}
                          </p>
                        </>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col xs="4">
                      <Card.Title>
                        <p>Employees</p>
                        <div>
                          <form>
                            <select
                              className="form-control"
                              onChange={this.handleOnChange}
                            >
                              <option value="">Select Employee</option>
                              {employees.map((e) => {
                                return <option value={e.id}>{e.email}</option>;
                              })}
                            </select>
                          </form>
                        </div>
                      </Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {Object.keys(search_emp).length > 0 ? (
            <Row>
              <Col xs="4">
                <Card className="card-stats p-2">
                  <Card.Body>
                    <p>Emp Leave Stat</p>
                    <>
                      <p style={emp_profile_style}>Leave Application - {total_leave_application}</p>
                      <p style={emp_profile_style}>Approved - {total_approved_leave_application}</p>
                      <p style={emp_profile_style}>Declined - {total_decline_leave_application}</p>
                      <p style={emp_profile_style}>Pending - {total_pending_leave_application}</p>
                      
                    </>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs="8">
                <Card className="card-stats p-2">
                  <Card.Body>
                    <p>Attendance Details</p>
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
