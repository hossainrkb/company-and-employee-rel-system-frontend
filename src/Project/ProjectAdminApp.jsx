import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import AdminNavbar from "./Navbars/AdminNavbar";
import AdminFooter from "./Footer/AdminFooter";
import AdminSidebar from "./Sidebar/AdminSidebar";

import sidebarImage from "assets/img/sidebar-3.jpg";
import AddCompany from "./Component/Company/AddCompany";
import CompanyList from "./Component/Company/List";
import { all_company } from "./Service/companyService";
import { getCurrentUser } from "./Service/adminService";
class ProjectAdminApp extends Component {
  constructor() {
    super();
    this.state = {
      image: sidebarImage,
      color: "black",
      hasImage: true,
      companies: [],
      activePage: 1,
      pageCount: 2,
      sortColumn: { column: "name", order: "asc" },
    };
  }

  allCompany = async () => {
    let { data } = await all_company();
    if (data.status == "ok") {
      let { data: companies } = data;
      this.setState({ companies });
    }
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  storeCompany = (company) => {
    let updatecompanies = [company, ...this.state.companies];
    this.setState({ companies: updatecompanies });
  };
  updateCompany = (company, id) => {
    let updatedCompanies = this.state.companies.map((e) => {
      if (e.id == id) {
        return company;
      } else {
        return e;
      }
    });
    this.setState({ companies: updatedCompanies });
  };
  deleteCompany = (e,id) => {
    let deleteCompanies = this.state.companies.filter(e=>e.id !=id);
    this.setState({ companies: deleteCompanies });
  };
  sortCompany = () => {
    const { sortColumn, companies } = this.state;
    let sortedList = _.orderBy(
      companies,
      [sortColumn.column],
      [sortColumn.order]
    );
    return sortedList;
  };
  paginateCompany = (companies) => {
    const { activePage, pageCount } = this.state;
    const start = (activePage - 1) * pageCount;
    let updatedCompanies = [];
    updatedCompanies = companies.slice(start, start + pageCount);
    return updatedCompanies;
  };
  handleClickePaginationPage = (e, page) => {
    this.setState({ ...this.state, activePage: page });
  };
  showCompany = (id) => {
    let updatecompanies = [...this.state.companies];
    let filtered = updatecompanies.filter((e) => e.id == id);
    return filtered[0];
  };
  editCompany = (e, id) => {
    this.props.history.push(`/edit-company/${id}`);
  };
  componentDidMount() {
    this.allCompany();
  }
  render() {
    // console.log(getCurrentUser())
    if (!getCurrentUser()) return null;
    const { color, hasImage, image, sortColumn, activePage, pageCount } =
      this.state;
    let columns = [
      { path: "name", label: "Name", content: (item) => item.name },
      { path: "username", label: "UserName", content: (item) => item.username },
      { path: "email", label: "Email", content: (item) => item.email },
      { path: "Action", label: "Action" },
    ];
    let actionButtonCompany = [
      {
        edit: {
          icon: "fa fa-edit",
          className: "text-info",
          onclickHandle: this.editCompany,
        },
      },
      {
        delete: {
          icon: "fa fa-trash",
          className: "text-danger",
          onclickHandle: this.deleteCompany,
        },
      },
    ];
    const sortedCompanies = this.sortCompany();
    const paginateCompany = this.paginateCompany(sortedCompanies);
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
                    <AddCompany {...props} storeCompany={this.storeCompany} />
                  )}
                />
                <Route
                  exact
                  path="/edit-company/:id"
                  render={(props) => (
                    <AddCompany
                      {...props}
                      storeCompany={this.storeCompany}
                      showCompany={this.showCompany}
                      updateCompany={this.updateCompany}
                    />
                  )}
                />
                <Route
                  exact
                  path="/company"
                  render={(props) => (
                    <CompanyList
                      {...props}
                      sortedCompanies={sortedCompanies}
                      paginateCompany={paginateCompany}
                      columns={columns}
                      actionButtonCompany={actionButtonCompany}
                      sortColumn={sortColumn}
                      handleSort={this.handleSort}
                      handleClickePaginationPage={
                        this.handleClickePaginationPage
                      }
                      activePage={activePage}
                      pageCount={pageCount}
                    />
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
