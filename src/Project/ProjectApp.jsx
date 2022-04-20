import React, { PureComponent, Component } from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import ProjectAdminApp from "./ProjectAdminApp.jsx";
import ProjectCompanyApp from "./ProjectCompanyApp.jsx";
import ProjectEmployeeApp from "./ProjectEmployeeApp.jsx";
import { getCurrentAdmin } from "./Service/adminService";
import { getCurrentCompany, cpmapanyLogout } from "./Service/companyService";
import { getCurrentEmployee,employeeLogout } from "./Service/employeeService";
import { adminLogout } from "./Service/adminService";

import AdminLogin from "./Component/Admin/Login";
import CompanyLogin from "./Component/Company/Login";
import EmployeeLogin from "./Component/Employee/Login";
import {
  raiseAdminToken,
  raiseCompanyToken,
  raiseEmployeeToken,
} from "./Service/tokenService";
import AdminInfoContext from "./Component/Context/AdminInfoContext";
import CompanyInfoContext from "./Component/Context/CompanyInfoContext";
import EmployeeInfoContext from "./Component/Context/EmployeeInfoContext";

class ProjectApp extends PureComponent {
  constructor() {
    super();
    this.state = {
      adminInfo: {},
      companyInfo: {},
      employeeInfo: {},
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    this.HIT_FOR_ADMIN_LOGIN();
    this.HIT_FOR_COMPANY_LOGIN();
    this.HIT_FOR_EMPLOYEE_LOGIN();
  }

  componentDidMount() {
    this.HIT_FOR_ADMIN_LOGIN();
    this.HIT_FOR_COMPANY_LOGIN();
    this.HIT_FOR_EMPLOYEE_LOGIN();
  }

  HIT_FOR_ADMIN_LOGIN = async () => {
    if (raiseAdminToken() && !Object.keys(this.state["adminInfo"]).length) {
      let responseAdmin = await getCurrentAdmin();
      if (
        responseAdmin.data.id != this.state.adminInfo.id ||
        Object.keys(this.state.adminInfo).length < 0
      ) {
        this.setState({ adminInfo: responseAdmin.data });
      }
    }
  };
  HIT_FOR_COMPANY_LOGIN = async () => {
    if (raiseCompanyToken() && !Object.keys(this.state["companyInfo"]).length) {
      let loginResponseCompany = await getCurrentCompany();
      if (
        loginResponseCompany.data.id != this.state.companyInfo.id ||
        Object.keys(this.state.companyInfo).length < 0
      ) {
        this.setState({ companyInfo: loginResponseCompany.data });
      }
    }
  };
  HIT_FOR_EMPLOYEE_LOGIN = async () => {
    if (
      raiseEmployeeToken() &&
      !Object.keys(this.state["employeeInfo"]).length
    ) {
      let loginResponseEmployee = await getCurrentEmployee();
      if (
        loginResponseEmployee.data.id != this.state.employeeInfo.id ||
        Object.keys(this.state.employeeInfo).length < 0
      ) {
        this.setState({ employeeInfo: loginResponseEmployee.data });
      }
    }
  };
  handleLogoutAdmin = async () => {
    await adminLogout();
    localStorage.removeItem("accessTokenAdmin");
    this.setState({ adminInfo: {} });
    this.props.history.push(`/admin-login`);
  };
  handleLogoutCompany = async () => {
    let { companyInfo } = this.state;
    await cpmapanyLogout(companyInfo.id);
    localStorage.removeItem("accessTokenCompany");
    this.setState({ companyInfo: {} });
    this.props.history.push(`/company-login`);
  };
  handleLogoutEmployee = async () => {
    let { employeeInfo } = this.state;
    await employeeLogout(employeeInfo.id);
    localStorage.removeItem("accessTokenEmployee");
    this.setState({ employeeInfo: {} });
    this.props.history.push(`/employee-login`);
  };
  render() {
    let { adminInfo, companyInfo, employeeInfo } = this.state;
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
            render={(props) => {
              if (raiseCompanyToken()) {
                return props.history.push("/company-dashboard");
              } else if (raiseAdminToken()) {
                return props.history.push("/admin/dashboard");
              } else if (raiseEmployeeToken()) {
                return props.history.push("/");
              } else {
                return <AdminLogin {...props} />;
              }
            }}
          />
        )}
        {Object.getOwnPropertyNames(companyInfo).length > 0 ? (
          <CompanyInfoContext.Provider value={{ companyInfo: companyInfo }}>
            <ProjectCompanyApp
              handleLogoutCompany={this.handleLogoutCompany}
              companyInfo={companyInfo}
            />
          </CompanyInfoContext.Provider>
        ) : (
          <Route
            exact
            path="/company-login"
            render={(props) => {
              if (raiseCompanyToken()) {
                return props.history.push("/company-dashboard");
              } else if (raiseAdminToken()) {
                return props.history.push("/admin/dashboard");
              } else if (raiseEmployeeToken()) {
                return props.history.push("/");
              } else {
                return <CompanyLogin {...props} />;
              }
            }}
          />
        )}
        {Object.getOwnPropertyNames(employeeInfo).length > 0 ? (
          <EmployeeInfoContext.Provider value={{ employeeInfo: employeeInfo }}>
            <ProjectEmployeeApp
              handleLogoutEmployee={this.handleLogoutEmployee}
              employeeInfo={employeeInfo}
            />
          </EmployeeInfoContext.Provider>
        ) : (
          <Route
            exact
            path="/employee-login"
            render={(props) => {
              if (raiseCompanyToken()) {
                return props.history.push("/company-dashboard");
              } else if (raiseAdminToken()) {
                return props.history.push("/admin/dashboard");
              } else if (raiseEmployeeToken()) {
                return props.history.push("/");
              } else {
                return <EmployeeLogin {...props} />;
              }
            }}
          />
        )}
      </>
    );
  }
}
export default withRouter(ProjectApp);
