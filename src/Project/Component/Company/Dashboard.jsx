import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ChartistGraph from "react-chartist";
import CompanyInfoContext from "../Context/CompanyInfoContext";
import {
  company_dashboard,
  approve_leave_application,
  decline_leave_application,
} from "../../Service/companyService";
import Moment from "react-moment";
import "moment-timezone";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_emp: "0",
      remain_quota: "0",
      total_attendance_on_day: "0",
      total_emp_working_hrs: "0",
      latest_five_pending_leave_application: [],
      company_info: {},
    };
  }
  approveLeaveRequest = async (e, leaveId) => {
    if (!confirm("Are You Sure to Approve?")) return true;
    let { data } = await approve_leave_application(this.props.id, leaveId);
    if (data.status == "ok") {
      let prevLeaveDetails = this.state.latest_five_pending_leave_application;
      let updatedLeaveDetails = prevLeaveDetails.filter((each) => {
        return each.current_leave.id != leaveId;
      });
      this.setState({
        latest_five_pending_leave_application: updatedLeaveDetails,
      });
    }
  };
  declineLeaveRequest = async (e, leaveId) => {
    if (!confirm("Are You Sure to Decline?")) return true;
    let { data } = await decline_leave_application(this.props.id, leaveId);
    if (data.status == "ok") {
      let prevLeaveDetails = this.state.latest_five_pending_leave_application;
      let updatedLeaveDetails = prevLeaveDetails.filter((each) => {
        return each.current_leave.id != leaveId;
      });
      this.setState({
        latest_five_pending_leave_application: updatedLeaveDetails,
      });
    }
  };
  async componentDidMount() {
    this.setState({ company_info: this.context.companyInfo });
    let { data } = await company_dashboard(this.context.companyInfo.id);
    if (data.status == "ok") {
      let {
        data: { status: info },
      } = data;
      this.setState({
        total_emp:
          info.total_emp.toString().length == 1
            ? `0${info.total_emp}`
            : info.total_emp,
        remain_quota:
          info.remain_quota.toString().length == 1
            ? `0${info.remain_quota}`
            : info.remain_quota,
        total_attendance_on_day:
          info.total_attendance_on_day.toString().length == 1
            ? `0${info.total_attendance_on_day}`
            : info.total_attendance_on_day,
        total_emp_working_hrs:
          info.total_emp_working_hrs.toString().length == 1
            ? `0${info.total_emp_working_hrs}`
            : info.total_emp_working_hrs,
        latest_five_pending_leave_application:
          info.latest_five_pending_leave_application,
      });
    }
  }
  render() {
    let {
      total_emp,
      remain_quota,
      total_attendance_on_day,
      total_emp_working_hrs,
      latest_five_pending_leave_application,
      company_info,
    } = this.state;
    return (
      <>
        <Container fluid>
          <Row>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-chart text-warning"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <NavLink
                          to={`company/${company_info.id}/employee`}
                          className="card-category"
                        >
                          <p>Employee List</p>
                        </NavLink>

                        <Card.Title as="h4">
                          <p className="badge">{total_emp}</p>
                        </Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Total Employee
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-light-3 text-success"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <NavLink
                          to={`company/${company_info.id}/add-employee`}
                          className="card-category"
                        >
                          <p>Add Employee</p>
                        </NavLink>
                        <Card.Title as="h4">
                          <p className="badge">{remain_quota}</p>
                        </Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-calendar-alt mr-1"></i>
                    Remaining Quota
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <NavLink
                          to={`company/${company_info.id}/emp-attendance`}
                          className="card-category"
                        >
                          <p>Attendance</p>
                        </NavLink>
                        <Card.Title as="h4">
                          <p className="badge">{total_attendance_on_day}</p>
                        </Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Total Attendance Today
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <CompanyInfoContext.Consumer>
                          {({ companyInfo }) => {
                            let emp_stat_url = `company/${companyInfo.id}/emp-stat`;
                            return (
                              <NavLink
                                to={emp_stat_url}
                                className="card-category"
                              >
                                <p className="card-category">Employee Stat</p>
                              </NavLink>
                            );
                          }}
                        </CompanyInfoContext.Consumer>
                        <Card.Title as="h4">
                          <p className="badge">{total_emp_working_hrs}</p>
                        </Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Total Working Hours Current Month
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">
                    Latest Pending Leave Application
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="table-full-width">
                    <Table>
                      <tbody>
                        {latest_five_pending_leave_application.length > 0 ? (
                          latest_five_pending_leave_application.map(
                            (e, index) => {
                              return (
                                <tr>
                                  <td>
                                    <p className="badge bg-info text-white">
                                      {index + 1}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="badge">{e.name}</p>
                                    <sub>
                                      <Moment format="YYYY/MM/DD">
                                        {e.current_leave
                                          ? e.current_leave.from_date
                                          : ""}
                                      </Moment>
                                      -
                                      <Moment format="YYYY/MM/DD">
                                        {e.current_leave
                                          ? e.current_leave.to_date
                                          : ""}
                                      </Moment>
                                    </sub>
                                    <p>
                                      {e.current_leave
                                        ? e.current_leave.leave_message.substring(
                                            0,
                                            100
                                          )
                                        : ""}
                                    </p>
                                  </td>
                                  <td className="td-actions text-right">
                                    <span
                                      className="btn btn-info btn-sm"
                                      onClick={(em) =>
                                        this.approveLeaveRequest(
                                          em,
                                          e.current_leave.id
                                        )
                                      }
                                    >
                                      <i className="fas fa-check"></i>
                                    </span>
                                    <span
                                      className="ml-1 btn btn-warning btn-sm"
                                      onClick={(em) =>
                                        this.declineLeaveRequest(
                                          em,
                                          e.current_leave.id
                                        )
                                      }
                                    >
                                      <i className="fas fa-times text-warning"></i>
                                    </span>
                                    &nbsp;
                                  </td>
                                </tr>
                              );
                            }
                          )
                        ) : (
                          <tr>
                            <td colSpan="3">No Record Found</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
                {latest_five_pending_leave_application.length > 0 ? (
                  <Card.Footer>
                    <hr></hr>
                    <div>
                      <i className="fas fa-check text-info"></i> Approve &nbsp;
                      <i className="fas fa-times text-warning"></i>Decline
                    </div>
                  </Card.Footer>
                ) : (
                  ""
                )}
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">
                    Top 3 Employee Based on Attendance
                  </Card.Title>
                  <p className="card-category">Last Campaign Performance</p>
                </Card.Header>
                <Card.Body>
                  <div
                    className="ct-chart ct-perfect-fourth"
                    id="chartPreferences"
                  >
                    <ChartistGraph
                      data={{
                        labels: ["40%", "20%", "40%"],
                        series: [40, 20, 40],
                      }}
                      type="Pie"
                    />
                  </div>
                  <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Emp 1 <i className="fas fa-circle text-danger"></i>
                    Emp 2 <i className="fas fa-circle text-warning"></i>
                    Emp 3
                  </div>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-clock"></i>
                    Campaign sent 2 days ago
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
Dashboard.contextType = CompanyInfoContext;
export default Dashboard;
