import React, { useContext, useState, useReducer, useEffect } from "react";
import EmployeeInfoContext from "../Context/EmployeeInfoContext";
import EmployeesImage from "../../../assets/img/emp-three.jpg";
import {
  emp_leave_application,
  emp_leave_application_logs,
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
  logs: [],
};
function EmpLeaveLogs() {
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

  useEffect(async () => {
    let { employeeInfo: info } = employeeInfo;
    let { data } = await emp_leave_application_logs(info.id);
    if (data.status && data.status == "ok") {
      let {
        data: { logs },
      } = data;
      setempLeaveApp({
        logs: logs,
      });
    }
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs="12">
          <Card className="card-stats">
            <div className="px-2 py-2 default_style_two">
              Leave Application Logs
            </div>
            <Card.Body>
              <Table className="table table-hover">
                <thead>
                  <tr>
                    <th>Ser No</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Messages</th>
                    <th>Status</th>
                  </tr>
                  {empLeaveApp.logs.length > 0 ? (
                        empLeaveApp.logs.map((e) => {
                          return (
                            <tr>
                              <td>
                                <p>{e.count}</p>
                              </td>
                              <td>
                                <p>{e.from_date}</p>
                              </td>
                              <td>
                                <p>{e.to_date}</p>
                              </td>
                              <td>
                                <p>{e.message}</p>
                              </td>
                              <td>
                                <p>{e.status}</p>
                              </td>
                            
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={"5"}>No Record Found</td>
                        </tr>
                      )}
                </thead>
              </Table>
            </Card.Body>
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
export default EmpLeaveLogs;
