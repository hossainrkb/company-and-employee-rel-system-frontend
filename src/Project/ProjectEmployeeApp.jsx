import React, { PureComponent, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import EmployeeNavbar from "./Navbars/EmployeeNavbar";
import EmployeeFooter from "./Footer/EmployeeFooter";
import EmployeeDashboard from "./Component/Employee/Dashboard";
import EmpLeaveLogs from "./Component/Employee/EmpLeaveLogs";
class ProjectEmployeeApp extends PureComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <EmployeeNavbar handleLogoutEmployee={this.props.handleLogoutEmployee} />
        <div className="p-2">
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <EmployeeDashboard {...props} />}
              />
              <Route
                exact
                path="/leave-appliction-logs"
                render={(props) => <EmpLeaveLogs {...props} />}
              />
            </Switch>
          </div>
          <EmployeeFooter />
        </div>
      </div>
    );
  }
}
export default withRouter(ProjectEmployeeApp);
