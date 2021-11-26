import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Input from "../../Common/Input";
import { emp_current_month_attendance } from "../../Service/companyService";
import { all_employee } from "../../Service/employeeService";
class EmpAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
      },
      errors: {
        email: "",
      },
      emp_list: [],
      search_emp: {},
      search_emp_record: {},
    };
  }
  handleValidation = (name, value) => {
    if (name == "email") {
      if (value.trim() == "") return "Email must not be empty";
    }
    return "";
  };
  handleOnChange = async (e) => {
    const email = e.target.value;
    let errors = { ...this.state.errors };
    if (email == "") {
      errors["email"] = "Email is empty";
      return this.setState({ errors });
    }
    if (email == "") {
      errors["email"] = "Email is empty";
      return this.setState({ errors });
    }
    let { data } = await emp_current_month_attendance(this.props.id, email);
    let {
      data: { employee },
    } = data;
    let {
      data: { records },
    } = data;
    this.setState({
      search_emp: employee,
      search_emp_record: records,
    });
  };
  async componentDidMount() {
    let { data } = await all_employee(this.props.id);
    if (data.status == "ok") {
      let {
        data: { employees },
      } = data;
      this.setState({ emp_list: employees });
    }
  }
  render() {
    const { email } = this.state.data;
    const { errors, emp_list, search_emp, search_emp_record } = this.state;
    return (
      <>
        <Container fluid>
          <Row>
            <Col lg="12" sm="12">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="8">
                      <Card.Title as="h4">
                        <p className="badge">Emp Attendance Current Month</p>
                        {Object.keys(search_emp).length > 0 ? (
                          <>
                            <div>
                              <hr></hr>
                              <p>{search_emp.name}</p>
                              <p>{search_emp.email}</p>
                              <p>{search_emp.company.name}</p>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </Card.Title>
                    </Col>
                    <Col xs="4">
                      <form>
                        <select
                          className="form-control"
                          onChange={this.handleOnChange}
                        >
                          <option value="">Select Employee</option>
                          {emp_list.map((e) => {
                            return <option value={e.id}>{e.email}</option>;
                          })}
                        </select>
                      </form>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                 <table className="table">
                     {/* <tr></tr> */}
                 {Object.keys(search_emp_record).length > 0 ? (
                     Object.keys(search_emp_record).map(e=>{
                           return (
                            <tr>
                            <td>{e}</td>
                           </tr>
                           )
                       
                     })
                        ) : (
                          ""
                        )}
                 </table>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default EmpAttendance;
