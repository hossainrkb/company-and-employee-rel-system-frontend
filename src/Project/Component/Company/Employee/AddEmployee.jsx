import React, { Component } from "react";
import { withRouter } from "react-router";
import { add_employee } from "../../../Service/employeeService";
import EmployeeLoadIntoDB from "./RenderProps/EmployeeLoadIntoDB";
class AddEmployee extends Component {
  addEmployeeIntoDB = async (empData)=>{
      let data = await add_employee(empData,this.props.match.params.documentID);
      let { data: parseData } = data;
      if (parseData.status == "ok") {
        let { data: finalData } = parseData;
        this.props.storeEmployeeState(empData, finalData.employee.id);
        this.props.history.push(`/company/${this.props.match.params.documentID}/employee`);
      }
  }
  render() {
    return (
      <>
        <EmployeeLoadIntoDB storeMethod={this.addEmployeeIntoDB} {...this.props}/>
      </>
    );
  }
}
export default withRouter(AddEmployee);
