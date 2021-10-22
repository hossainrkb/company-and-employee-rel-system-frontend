import React, { Component } from "react";
import _ from "lodash";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import TableHeader from "../../Common/TableHeader.Component";
import TableBody from "../../Common/TableBody.Component";
import Pagination from "../../Common/Pagination.Component";
class List extends Component {
  render() {
    let {
      sortedCompanies,
      paginateCompany,
      sortColumn,
      columns,
      actionButtonCompany,
      handleSort,
      handleClickePaginationPage,
      pageCount,
      activePage,
    } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Company List</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <TableHeader
                    columns={columns}
                    handleSort={handleSort}
                    sortColumn={sortColumn}
                  />
                  <TableBody items={paginateCompany} columns={columns} actionButtonCompany={actionButtonCompany} />
                </Table>
                <Pagination
                  totalItems={
                    sortedCompanies != undefined
                      ? sortedCompanies.length
                      : sortedCompanies.length
                  }
                  pageCount={pageCount}
                  activePage={activePage}
                  handleClickePage={handleClickePaginationPage}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default List;
