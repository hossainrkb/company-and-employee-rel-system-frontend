import React, { Component } from "react";
import { Container } from "react-bootstrap";

class AdminFooter extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
             <span>Void</span>
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default AdminFooter;
