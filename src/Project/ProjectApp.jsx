import React, { PureComponent, Component } from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import ProjectAdminApp from "./ProjectAdminApp.jsx";
import { getCurrentUser } from "./Service/adminService";
import { logout } from "./Service/adminService";
import AdminLogin from "./Component/Admin/Login";
class ProjectApp extends Component {
  constructor() {
    super();
    this.state = {
      adminInfo: {},
    };
  }

  async componentDidUpdate() {
    let { data } = await getCurrentUser();
    if (
      data.id != this.state.adminInfo.id ||
      Object.keys(this.state.adminInfo).length < 0
    ) {
      this.setState({ adminInfo: data });
    }
  }
  handleLogoutAdmin = async () => {
    await logout();
    this.setState({ adminInfo: {} });
    this.props.history.push(`/admin-login`);
  };
  render() {
    let { adminInfo } = this.state;
    return (
      <>
        {Object.getOwnPropertyNames(adminInfo).length == 0 ? (
          <Route
            exact
            path="/admin-login"
            render={(props) => <AdminLogin {...props} />}
          />
        ) : (
          <ProjectAdminApp
            adminInfo={this.state.adminInfo}
            handleLogoutAdmin={this.handleLogoutAdmin}
          />
        )}
      </>
    );
  }
}
export default withRouter(ProjectApp);
