import React, { PureComponent, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Crud from "./Common/Crud.Component";
import CompanyNavbar from "./Navbars/CompanyNavbar";
import AdminFooter from "./Footer/AdminFooter";
import CompanyDashboard from "./Component/Company/Dashboard";
import CompanyEmpAttendance from "./Component/Company/Attendance";
import EmpStat from "./Component/Company/EmpStat";
import AddEmployee from "./Component/Company/Employee/AddEmployee";
import EditEmployee from "./Component/Company/Employee/EditEmployee";
import EmployeeList from "./Component/Company/Employee/EmployeeList";
import { all_employee, destroy_employee } from "./Service/employeeService";
import CompanyInfoContext from "./Component/Context/CompanyInfoContext";
class ProjectCompanyApp extends PureComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <CompanyNavbar handleLogoutCompany={this.props.handleLogoutCompany} />
        <div className="p-2">
          <div>
            <Switch>
              <Route
                exact
                path="/company/:companyID/emp-stat"
                render={(props) => (
                  <CompanyInfoContext.Consumer>
                    {({ companyInfo }) => {
                      return <EmpStat {...companyInfo} />;
                    }}
                  </CompanyInfoContext.Consumer>
                )}
              />
              <Route
                exact
                path="/company/:companyID/emp-attendance"
                render={(props) => (
                  <CompanyInfoContext.Consumer>
                    {({ companyInfo }) => {
                      return <CompanyEmpAttendance {...companyInfo} />;
                    }}
                  </CompanyInfoContext.Consumer>
                )}
              />
              <Route
                exact
                path="/company-dashboard"
                render={(props) => <CompanyDashboard {...props} />}
              />
              <Route
                exact
                path="/company/:documentID/:employeeID/edit-employee"
                render={(props) => <EditEmployee {...props} />}
              />
              <Route
                exact
                path="/company/:documentID/add-employee"
                render={(props) => <AddEmployee {...props} />}
              />
              <Route
                exact
                path="/company/:documentID/employee"
                render={(props) => <EmployeeList {...props} />}
              />
            </Switch>
          </div>
          <AdminFooter />
        </div>
      </div>
    );
  }
}
export default withRouter(ProjectCompanyApp);
