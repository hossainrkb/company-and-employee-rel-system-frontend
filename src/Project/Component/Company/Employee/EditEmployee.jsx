import React, { Component } from "react";
import { withRouter } from "react-router";
import { add_employee, edit_employee,update_employee } from "../../../Service/employeeService";
import EmployeeLoadIntoDB from "./RenderProps/EmployeeLoadIntoDB";
class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  updateEmployeeIntoDB = async (empData,id) => {
    let data = await update_employee(empData, this.props.match.params.documentID,id);
    let { data: parseData } = data;
    if (parseData.status == "ok") {
      let { data: finalData } = parseData;
      this.props.updateEmployeeState(empData, finalData.id);
      this.props.history.push(
        `/company/${this.props.match.params.documentID}/employee`
      );
    }
  };
  editEmployee = async () => {
    return await edit_employee(
      this.props.match.params.documentID,
      this.props.match.params.employeeID
    );
   
  };

  render() {
    return (
      <>
        <EmployeeLoadIntoDB
          storeMethod={this.updateEmployeeIntoDB}
          editEmployee={this.editEmployee}
          {...this.props}
        />
      </>
    );
  }
}
export default withRouter(EditEmployee);
