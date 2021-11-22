import React, { PureComponent, Component } from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import ProjectAdminApp from "./ProjectAdminApp.jsx";
import ProjectCompanyApp from "./ProjectCompanyApp.jsx";
import { getCurrentAdmin } from "./Service/adminService";
import { getCurrentCompany } from "./Service/companyService";
import { logout } from "./Service/adminService";
import AdminLogin from "./Component/Admin/Login";
import CompanyLogin from "./Component/Company/Login";
import { raiseAdminToken, raiseCompanyToken } from "./Service/tokenService";
import AdminInfoContext from "./Component/Context/AdminInfoContext";
import CompanyInfoContext from './Component/Context/CompanyInfoContext';

class ProjectApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      adminInfo: {},
      companyInfo: {},
    };
  }
  async componentDidUpdate() {
    if (raiseAdminToken()) {
      let responseAdmin = await getCurrentAdmin();
      if (
        responseAdmin.data.id != this.state.adminInfo.id ||
        Object.keys(this.state.adminInfo).length < 0
      ) {
        this.setState({ adminInfo: responseAdmin.data });
      }
    }
    if (raiseCompanyToken()) {
      let loginResponseCompany = await getCurrentCompany();
      if (
        loginResponseCompany.data.id != this.state.companyInfo.id ||
        Object.keys(this.state.companyInfo).length < 0
      ) {
        this.setState({ companyInfo: loginResponseCompany.data });
      }
    }
  }
  handleLogoutAdmin = async () => {
    await logout();
    this.setState({ adminInfo: {} });
    this.props.history.push(`/admin-login`);
  };
  handleLogoutCompany = async () => {
    await logout();
    this.setState({ companyInfo: {} });
    this.props.history.push(`/company-login`);
  };
  render() {
    let { adminInfo, companyInfo } = this.state;
    return (
      <>
        {Object.getOwnPropertyNames(adminInfo).length > 0 ? (
          <AdminInfoContext.Provider value={{ adminInfo: adminInfo }}>
            <ProjectAdminApp handleLogoutAdmin={this.handleLogoutAdmin} />
          </AdminInfoContext.Provider>
        ) : (
          <Route
            exact
            path="/admin-login"
            render={(props) => <AdminLogin {...props} />}
          />
        )}
        {Object.getOwnPropertyNames(companyInfo).length > 0 ? (
          <CompanyInfoContext.Provider value={{ companyInfo: companyInfo }}>
          <ProjectCompanyApp
            handleLogoutCompany={this.handleLogoutCompany}
          />
           </CompanyInfoContext.Provider>
        ) : (
          <Route
            exact
            path="/company-login"
            render={(props) => <CompanyLogin {...props} />}
          />
        )}
      </>
    );
  }
}
export default withRouter(ProjectApp);
