import React, { PureComponent, useState, useEffect } from "react";
import _ from "lodash";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import TableHeader from "../../../Common/TableHeader.Component";
import TableBody from "../../../Common/TableBody.Component";
import LoadMore from "../../../Common/LoadMore.Component";
import { all_company, destroy_company } from "../../../Service/companyService";
const CompanyList = (props) => {
  const [company_list, setCompany] = useState([]);
  const [default_active_page, setActivepage] = useState(1);
  const [default_page_count, setPageCount] = useState(5);
  const [default_sorted_col, setSortColumn] = useState({
    column: "name",
    order: "asc",
  });

  useEffect(async () => {
    let company_list_response = await all_company();
    let { data: company_list } = company_list_response;
    if (company_list.status && company_list.status == "ok") {
      setCompany(company_list.data);
    }
  }, []);
 
  const editCompany = (e,id) => {
    props.history.push(`/edit-company/${id}`);
  };
  const deleteCompany = async (e,id) => {
    if(!confirm('Are You Sure ? ')) return;
    let destroy_company_response = await destroy_company(id);
    let { data: destroy } = destroy_company_response;
    if(destroy.status && destroy.status == 'ok'){
      alert(destroy.message);
      let update_company_list = company_list.filter((e) => e.id != id);
      setCompany(update_company_list);
    }
  };
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const sortData = () => {
    let sortedList = _.orderBy(
      company_list,
      [default_sorted_col.column],
      [default_sorted_col.order]
    );
    return sortedList;
  };
  const loadMore = (datas) => {
    const start = 0;
    let updateDatas = [];
    updateDatas = datas.slice(start, default_active_page * default_page_count);
    return updateDatas;
  };
  const handleClickePaginationPage = (e, page) => {
    let next_page = page + 1;
    setActivepage(next_page);
  };
  const sorteddatas = sortData();
  const paginateDatas = loadMore(sorteddatas);
  let columns = [
    { path: "iteration", label: "SL", iteration: true },
    { path: "name", label: "Name", content: (item) => item.name },
    { path: "username", label: "UserName", content: (item) => item.username },
    { path: "email", label: "Email", content: (item) => item.email },
    { path: "Action", label: "Action" },
  ];
  let actionButtonComapany = [
    {
      edit: {
        icon: "fa fa-edit",
        className: "text-info",
        onclickHandle: editCompany,
      },
    },
    {
      delete: {
        icon: "fa fa-trash",
        className: "text-danger",
        onclickHandle: deleteCompany,
      },
    },
  ];
  let show_loadmore = true;
  if (Math.ceil(sorteddatas.length / default_page_count) <= default_active_page)
    show_loadmore = false;
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
                  sortColumn={default_sorted_col}
                  />
                <TableBody
                  items={paginateDatas}
                  columns={columns}
                  actionButton = {actionButtonComapany}
                  editUrl="edit-company"
                />
              </Table>
              {show_loadmore && (
                <LoadMore
                  activePage={default_active_page}
                  handleClickePage={handleClickePaginationPage}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default CompanyList;