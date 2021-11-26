import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Input from "../../Common/Input";
import { current_month_attendance } from "../../Service/companyService";
import { all_employee } from "../../Service/employeeService";
class EmpAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: {},
      month: "",
      year: "",
      day: "",
    };
  }

  async componentDidMount() {
    let { data } = await current_month_attendance(this.props.id);
    if (data.status == "ok") {
      let {
        data: { records },
      } = data;
      let {
        data: { month },
      } = data;
      let {
        data: { year },
      } = data;
      let {
        data: { day },
      } = data;
      this.setState({ records: records, month: month, year: year,day:day });
    }
  }
  render() {
    const { records,month,year,day } = this.state;
    return (
      <>
        <Container fluid>
          <Row>
            <Col lg="12" sm="12">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="12">
                      <Card.Title>
                        <p className="badge">Attendance Current</p>
                        {Object.keys(records).length > 0 ? (
                          <div style={{ overflow: "auto" }}>
                            {Object.keys(records).length > 0 ? (
                              <table className="table table-border">
                                  <tr>
                                      <td className="bg-warning">{month} {year}</td>
                                  </tr>
                                <tr>
                                  {Object.keys(records).map((e) => {
                                    return (
                                      <td
                                        style={{
                                          border: "1px solid",
                                          padding: "10px 50px",
                                        }}
                                      >
                                        <span className="badge">Day-{e.toString().length ==1? `0${e}`:e}</span>
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr>
                                  {Object.keys(records).map((e) => {
                                    return (
                                      <td
                                        style={{
                                          border: "1px solid black",
                                        }}
                                      >
                                        {records[e].map((eachEmp) => {
                                          return (
                                            <tr>
                                              <td className="text-center">
                                                <p className="badge">
                                                  {eachEmp.employee.name}
                                                </p>
                                                <p>
                                                  {eachEmp.checkIn ? (
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
                                                </p>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </td>
                                    );
                                  })}
                                </tr>
                              </table>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default EmpAttendance;
