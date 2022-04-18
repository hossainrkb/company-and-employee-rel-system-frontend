import React, { PureComponent, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Crud from "./Common/Crud.Component";
import AdminNavbar from "./Navbars/AdminNavbar";
import AdminFooter from "./Footer/AdminFooter";
import AdminSidebar from "./Sidebar/AdminSidebar";
import sidebarImage from "assets/img/sidebar-3.jpg";
import AddCompany from "./Component/Admin/Company/AddCompany";
import CompanyList from "./Component/Admin/Company/CompanyList";
import { all_company, destroy_company } from "./Service/companyService";
import EditCompany from "./Component/Admin/Company/EditCompany";

class ProjectAdminApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      image: sidebarImage,
      color: "black",
      companies: [],
      hasImage: true,
    };
  }
  allCompany = async () => {
    let { data } = await all_company();
    if (data.status == "ok") {
      return data;
    }
  };
  destroyCompnay = async (id) => {
    let { data } = await destroy_company(id);
    if (data.status == "ok") {
      return data;
    }
  };
  render() {
    const { color, hasImage, image, companies, sortColumn } = this.state;
    return (
      <div>
        <div className="wrapper">
          <AdminSidebar color={color} image={hasImage ? image : ""} />
          <div className="main-panel">
            <AdminNavbar handleLogoutAdmin={this.props.handleLogoutAdmin} />
            <div className="content">
              <Switch>
                <Route
                  exact
                  path="/add-company"
                  render={(props) => <AddCompany {...props} />}
                />
                <Route
                  exact
                  path="/edit-company/:id"
                  render={(props) => <EditCompany {...props} />}
                />
                <Route
                  exact
                  path="/admin/company"
                  render={(props) => <CompanyList {...props} />}
                />
                <Route
                  exact
                  path="/not-found"
                  render={() => {
                    alert("Not Found");
                  }}
                />
                <Redirect to="/not-found" />
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
