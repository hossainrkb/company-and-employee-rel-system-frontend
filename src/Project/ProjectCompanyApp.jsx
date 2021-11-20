import React, { PureComponent, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Crud from "./Common/Crud.Component";
import AdminNavbar from "./Navbars/AdminNavbar";
import AdminFooter from "./Footer/AdminFooter";
import AdminSidebar from "./Sidebar/AdminSidebar";
import sidebarImage from "assets/img/sidebar-3.jpg";
import AddCompany from "./Component/Company/AddCompany";
import CompanyList from "./Component/Company/List";
import { getAdminHeaders } from "./Service/headers";
import {
  all_company,
  destroy_employee,
  update_company,
} from "./Service/companyService";
import { getCurrentUser } from "./Service/adminService";
import AdminInfoContext from "./Component/Context/AdminInfoContext";
class ProjectCompanyApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      image: sidebarImage,
      color: "black",
      companies: [],
      hasImage: true,
      sortColumn: { column: "name", order: "asc" },
      adminInfo: {},
    };
  }
  allEmployee = async () => {
    let { data } = await all_company();
    if (data.status == "ok") {
      return data;
    }
  };
  destroyEmployee = async (id) => {
    let { data } = await destroy_employee(id);
    if (data.status == "ok") {
      return data;
    }
  };
  componentDidMount() {}
  async componentDidUpdate() {
    let { data } = await getCurrentUser();
    if (
      data.id != this.state.adminInfo.id ||
      Object.keys(this.state.adminInfo).length < 0
    ) {
      this.setState({ adminInfo: data });
    }
  }
  render() {
    if (!getAdminHeaders()) return true;
    let columnsCompany = [
      { path: "name", label: "Name", content: (item) => item.name },
      { path: "username", label: "UserName", content: (item) => item.username },
      { path: "email", label: "Email", content: (item) => item.email },
      { path: "Action", label: "Action" },
    ];

    const { color, hasImage, image, companies, sortColumn } = this.state;
    return (
      <div>
        <div className="wrapper">
          <AdminSidebar color={color} image={hasImage ? image : ""} />
          <div className="main-panel">
            <AdminInfoContext.Provider
              value={{ admininfo: this.state.adminInfo }}
            >
              <AdminNavbar />
            </AdminInfoContext.Provider>
            <div className="content">
              <Switch>
                <Route
                  exact
                  path="/add-company"
                  render={(props) => (
                    <Crud>
                      {(obj) => {
                        return (
                          <AddCompany {...props} storeCompany={obj.storeData} />
                        );
                      }}
                    </Crud>
                  )}
                />
                <Route
                  exact
                  path="/edit-company/:id"
                  render={(props) => (
                    <Crud>
                      {(obj) => {
                        return (
                          <AddCompany
                            {...props}
                            showCompany={obj.showData}
                            updateCompany={obj.updateData}
                          />
                        );
                      }}
                    </Crud>
                  )}
                />
                <Route
                  exact
                  path="/company"
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
                          columns: columnsCompany,
                          actionButton: actionButtonComapany,
                        };
                        return <CompanyList {...props} {...new_obj} />;
                      }}
                    </Crud>
                  )}
                />
               
              </Switch>
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ProjectCompanyApp);
