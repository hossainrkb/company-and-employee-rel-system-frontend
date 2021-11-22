import React, { PureComponent } from "react";
import _ from "lodash";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import TableHeader from "../../../Common/TableHeader.Component";
import TableBody from "../../../Common/TableBody.Component";
import Pagination from "../../../Common/Pagination.Component";
class List extends PureComponent {
  render() {
    
    let {
      sortedDatas,
      paginateDatas,
      sortColumn,
      columns,
      actionButton,
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
                <Card.Title as="h4">Employee List</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <TableHeader
                    columns={columns}
                    handleSort={handleSort}
                    sortColumn={sortColumn}
                  />
                  <TableBody items={paginateDatas} columns={columns} actionButton={actionButton} editUrl="edit-company" />
                </Table>
                <Pagination
                  totalItems={
                    sortedDatas != undefined
                      ? sortedDatas.length
                      : sortedDatas.length
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
