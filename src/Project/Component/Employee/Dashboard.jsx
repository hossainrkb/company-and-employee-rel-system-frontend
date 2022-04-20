import React, { useContext, useState, useReducer } from "react";
import EmployeeInfoContext from "../Context/EmployeeInfoContext";
import EmployeesImage from '../../../assets/img/emp-three.jpg'
import {
  checkin_employee,
  checkout_employee,
  emp_leave_application,
} from "../../Service/employeeService";
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
  Modal,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const reducerBaseStateForLeaveApplication = (prevState, action) => {
  switch (action.type) {
    case "fromdate":
      return { ...prevState, fromdate: action.value };
      break;
    case "todate":
      return { ...prevState, todate: action.value };
      break;
    default:
      return { ...prevState, ...action };
      break;
  }
};
let initLeaveApplicationStat = {
  fromdate: new Date(),
  todate: new Date(),
  leave_message: "",
};
function Dashboard(props) {
  const [showModal, setShowModal] = useState(false);
  const [empLeaveApp, setempLeaveApp] = useReducer(
    reducerBaseStateForLeaveApplication,
    initLeaveApplicationStat
  );
  let employeeInfo = useContext(EmployeeInfoContext);
  const submitLeaveApplication = async () => {
    let { employeeInfo: info } = employeeInfo;
    if (!empLeaveApp.fromdate) {
      alert("From Date Filed is not Valid");
      return;
    }
    if (!empLeaveApp.todate) {
      alert("To Date Filed is not Valid");
      return;
    }
    if (!empLeaveApp.leave_message) {
      alert("Message Filed is not Valid");
      return;
    }
    let req_data = {
      employee_id: info.id,
      leave_type: "1",
      from_date: empLeaveApp.fromdate,
      to_date: empLeaveApp.todate,
      leave_message: empLeaveApp.leave_message,
    };
    let { data } = await emp_leave_application(info.id, req_data);
    if (data.status && data.status == "ok") {
      alert(data.message);
    }
    if (data.status && data.status == "error") {
      alert(data.message);
    }
  };

  const checkIn = async (e) => {
    if (!confirm("Aru You Sure to Check In?")) return;
    let { employeeInfo: info } = employeeInfo;
    let { data } = await checkin_employee(info.id, { check_in: new Date() });
    if (data.status == "ok") {
      alert(data.message);
    } else if (data.status == "error") {
      alert(data.message);
    }
  };
  const checkOut = async (e) => {
    if (!confirm("Aru You Sure to Check Out?")) return;
    let { employeeInfo: info } = employeeInfo;
    let { data } = await checkout_employee(info.id, { check_out: new Date() });
    if (data.status == "ok") {
      alert(data.message);
    } else if (data.status == "error") {
      alert(data.message);
    }
  };

  const headingIntoDetails = (path)=>{
    props.history.push(`/${path}`)
  }
  return (
    <Container fluid>
     <Row className="justify-content-center">
        <Col md="9">
          {/* <Card.Title as="h4">HEAD Places</Card.Title> */}
          <Card.Body style={{ padding:"0",paddingBottom:"5px",}}>
          <img src={EmployeesImage} alt="" width={"100%"} height={150} style={{ borderRadius:"5px"  }}/>
          </Card.Body>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col
          lg="3"
          md="3"
          className="cursor_pointer"
          onClick={(e) => {
            checkIn(e);
          }}
        >
          <Card className="card-stats default_style_two">
            <Card.Body>
              <Row>
                <Col xs="12">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <hr></hr>
              <div className="">
                <i className="fas fa-redo mr-1"></i>
                Check In
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col
          lg="3"
          md="3"
          className="cursor_pointer"
          onClick={(e) => {
            checkOut(e);
          }}
        >
          <Card className="card-stats default_style_two">
            <Card.Body>
              <Row>
                <Col xs="12">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <hr></hr>
              <div className="">
                <i className="fas fa-redo mr-1"></i>
                Check Out
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col
          lg="3"
          md="3"
          className="cursor_pointer"
          onClick={() => setShowModal(true)}
        >
          <Card className="card-stats default_style_two">
            <Card.Body>
              <Row>
                <Col xs="12">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <hr></hr>
              <div className="">
                <i className="fas fa-redo mr-1"></i>
                Leave Application
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="3" md="3"  className="cursor_pointer">
          <Card className="card-stats default_style_two">
            <Card.Body>
              <Row>
                <Col xs="12">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <hr></hr>
              <div className="">
                <i className="fas fa-redo mr-1"></i>
                Salary Logs
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" md="3"  className="cursor_pointer"   onClick={() => headingIntoDetails('leave-appliction-logs')}>
          <Card className="card-stats default_style_two">
            <Card.Body>
              <Row>
                <Col xs="12">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <hr></hr>
              <div className="">
                <i className="fas fa-redo mr-1"></i>
                Leave Application Logs
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" md="3">
          <Card className="card-stats default_style_two">
            <Card.Body>
              <Row>
                <Col xs="12">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart"></i>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <hr></hr>
              <div className="">
                <i className="fas fa-redo mr-1"></i>
                Attendance Logs
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Modal
        className="modal-large modal-primary"
        show={showModal}
        style={{ marginTop: "-100px" }}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header className="justify-content-center">
          <div className="">Employee Leave Application</div>
        </Modal.Header>
        <Modal.Body>
          <div>Form Date</div>
          <DatePicker
            required
            dateFormat="dd MMMM yyyy"
            className="form-control"
            selected={empLeaveApp.fromdate}
            onChange={(date) =>
              setempLeaveApp({ type: "fromdate", value: date })
            }
          />
          <div>To Date</div>
          <DatePicker
            required
            dateFormat="dd MMMM yyyy"
            className="form-control"
            selected={empLeaveApp.todate}
            onChange={(date) => setempLeaveApp({ type: "todate", value: date })}
          />
          <div>Leave Message</div>
          <textarea
            placeholder="Leave Message"
            value={empLeaveApp.leave_message}
            onChange={(e) => {
              setempLeaveApp({
                type: "init",
                leave_message: e.target.value,
              });
            }}
            required
            className="form-control"
          />
          <br />
          <Button
            onClick={() => {
              submitLeaveApplication();
            }}
            className={"btn btn-info btn-block"}
          >
            Submit
          </Button>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            type="button"
            variant="link"
            onClick={() => setShowModal(false)}
          >
            Back
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="link"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </Container>
  );
}
export default Dashboard;
