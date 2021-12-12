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
import EmployeeList from "./Component/Company/Employee/List";
import { all_employee, destroy_employee } from "./Service/employeeService";
import CompanyInfoContext from "./Component/Context/CompanyInfoContext";
class ProjectCompanyApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      sortColumn: { column: "name", order: "asc" },
    };
  }

  //Employee Methods
  allEmployee = async (documentID) => {
    let { data } = await all_employee(documentID);
    if (data.status == "ok") {
      return { data: data.data.employees };
    }
  };
  destroyEmployee = async (id) => {
    let {companyInfo:{id:companyId}} = this.props;
    return await destroy_employee(companyId,id);
  };

  render() {
    let columnsEmployee = [
      { path: "name", label: "Name", content: (item) => item.name },
      { path: "email", label: "Email", content: (item) => item.email },
      { path: "Action", label: "Action" },
    ];
    const { sortColumn } = this.state;
    return (
      <div>
        <CompanyNavbar />
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
                render={(props) => (
                  <CompanyInfoContext.Consumer>
                    {({ companyInfo }) => {
                      return <CompanyDashboard {...companyInfo} />;
                    }}
                  </CompanyInfoContext.Consumer>
                )}
              />
              <Route
                exact
                path="/company/:documentID/:employeeID/edit-employee"
                render={(props) => (
                  <Crud
                    sortColumn={sortColumn}
                    populateBaseArray={this.allEmployee}
                    destroyEmployee={this.destroyEmployee}
                  >
                    {(obj) => {
                      return (
                        <EditEmployee
                          {...props}
                          {...obj}
                          updateEmployeeState={obj.updateData}
                        />
                      );
                    }}
                  </Crud>
                )}
              />
              <Route
                exact
                path="/company/:documentID/add-employee"
                render={(props) => (
                  <Crud
                    sortColumn={sortColumn}
                    populateBaseArray={this.allEmployee}
                    destroyEmployee={this.destroyEmployee}
                  >
                    {(obj) => {
                      console.log(obj);
                      return (
                        <AddEmployee
                          {...props}
                          {...obj}
                          storeEmployeeState={obj.storeData}
                        />
                      );
                    }}
                  </Crud>
                )}
              />
              <Route
                exact
                path="/company/:documentID/employee"
                render={(props) => (
                  <Crud
                    sortColumn={sortColumn}
                    populateBaseArray={this.allEmployee}
                    destroyEmployee={this.destroyEmployee}
                  >
                    {(obj) => {
                      let actionButtonComapany = [
                        {
                          edit: {
                            icon: "fa fa-edit",
                            className: "text-info",
                            onclickHandle: obj.editData,
                          },
                        },
                        {
                          delete: {
                            icon: "fa fa-trash",
                            className: "text-danger",
                            onclickHandle: obj.deleteData,
                          },
                        },
                      ];
                      let new_obj = {
                        ...obj,
                        columns: columnsEmployee,
                        actionButton: actionButtonComapany,
                      };
                      return <EmployeeList {...props} {...new_obj} />;
                    }}
                  </Crud>
                )}
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
