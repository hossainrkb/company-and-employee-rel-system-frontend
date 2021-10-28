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
import { all_company } from "./Service/companyService";
import { getCurrentUser } from "./Service/adminService";
class ProjectAdminApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      image: sidebarImage,
      color: "black",
      companies: [],
      hasImage: true,
      sortColumn: { column: "name", order: "asc" },
    };
  }
  allCompany = async () => {
    let { data } = await all_company();
    if (data.status == "ok") {
      return data;
    }
  };
  render() {
    let columnsCompany = [
      { path: "name", label: "Name", content: (item) => item.name },
      { path: "username", label: "UserName", content: (item) => item.username },
      { path: "email", label: "Email", content: (item) => item.email },
      { path: "Action", label: "Action" },
    ];
    if (!getCurrentUser()) return null;
    const { color, hasImage, image, companies, sortColumn } = this.state;
    return (
      <div>
        <div className="wrapper">
          <AdminSidebar color={color} image={hasImage ? image : ""} />
          <div className="main-panel">
            <AdminNavbar />
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
                            storeCompany={obj.storeData}
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
                      populateBaseArray={this.allCompany}
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
export default withRouter(ProjectAdminApp);
