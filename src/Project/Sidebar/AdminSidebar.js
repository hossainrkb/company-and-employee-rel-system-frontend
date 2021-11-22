import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

function AdminSidebar({ color, image, routes }) {
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/reactlogo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            VOID <sub>Admin</sub>
          </a>
        </div>
        <Nav>
          <li>
            <NavLink to="/company"  className="nav-link">
              <i className="fa fa-industry"></i>
              <p>Company</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-company"  className="nav-link">
              <i className="fa fa-industry"></i>
              <p>Add Company</p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default AdminSidebar;
