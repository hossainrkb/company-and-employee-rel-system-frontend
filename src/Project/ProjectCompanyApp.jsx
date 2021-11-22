import React, { PureComponent, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Crud from "./Common/Crud.Component";
import CompanyNavbar from "./Navbars/CompanyNavbar";
import AdminFooter from "./Footer/AdminFooter";
import CompanyDashboard from "./Component/Company/Dashboard";
import AddEmployee from "./Component/Company/Employee/AddEmployee";
import EmployeeList from "./Component/Company/Employee/List";
import { all_employee, destroy_employee } from "./Service/employeeService";
class ProjectCompanyApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      companies: [],
      sortColumn: { column: "name", order: "asc" },
    };
  }
  allEmployee = async (documentID) => {
    let { data } = await all_employee(documentID);
    if (data.status == "ok") {
      return {data:data.data.employees};
    }
  };
  destroyEmployee = async (id) => {
    let { data } = await destroy_employee(id);
    if (data.status == "ok") {
      return data;
    }
  };
  render() {
    let columnsEmployee = [
      { path: "name", label: "Name", content: (item) => item.name },
      { path: "email", label: "Email", content: (item) => item.email },
      { path: "Action", label: "Action" },
    ];
    const {  sortColumn } = this.state;
    return (
      <div>
        <CompanyNavbar />
        <div className="p-2">
          <div>
            <Switch>
              <Route
                exact
                path="/company-dashboard"
                render={(props) => <CompanyDashboard {...props} />}
              />
              <Route
                exact
                path="/company/:documentID/add-employee"
                render={(props) => (
                  <Crud
                  sortColumn={sortColumn}
                  populateBaseArray={this.allEmployee}
                  destroyRow={this.destroyEmployee}
                  >
                    {(obj) => {
                      console.log(obj)
                      return (
                        <AddEmployee 
                        {...props} {...obj} storeEmployeeState={obj.storeData} />
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
                      destroyRow={this.destroyEmployee}
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
