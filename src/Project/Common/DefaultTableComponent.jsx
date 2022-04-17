import React, { useEffect, useReducer } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import TableHeader from "./TableHeader.Component";
import TableBody from "./TableBody.Component";
import LoadMore from "./LoadMore.Component";

const initialState = {
  datas: [],
  default_active_page: 1,
  default_page_count: 5,
  default_sorted_col: {},
};
const reducer = (state, action) => {
  if (action.type == "sorted_col") {
    return { ...state, default_sorted_col: action.default_sorted_col };
  } else if (action.type == "set_active_page") {
    return { ...state, default_active_page: action.default_active_page };
  } else {
    return state;
  }
};
const DefaultTableComponent = (props) => {
  const [doc_state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let { default_sorted_col } = props.children;
    dispatch({ type: "sorted_col", default_sorted_col });
  }, []);

  const handleSort = (sortColumn) => {
    dispatch({ type: "sorted_col", default_sorted_col: sortColumn });
  };
  const sortData = () => {
    let { default_sorted_col } = doc_state;
    let { data } = props.children;
    let sortedList = _.orderBy(
      data,
      [default_sorted_col.column],
      [default_sorted_col.order]
    );
    return sortedList;
  };
  const loadMore = (datas) => {
    const start = 0;
    let updateDatas = [];
    updateDatas = datas.slice(
      start,
      doc_state.default_active_page * doc_state.default_page_count
    );
    return updateDatas;
  };

  const handleClickePaginationPage = (e, page) => {
    let next_page = page + 1;
    dispatch({ type: "set_active_page", default_active_page: next_page });
  };
  const sorteddatas = sortData();
  const paginateDatas = loadMore(sorteddatas);
  let { columns, actionButton } = props.children;
  let { default_sorted_col, default_page_count, default_active_page } =
    doc_state;
  let show_loadmore = true;
  if (Math.ceil(sorteddatas.length / default_page_count) <= default_active_page)
    show_loadmore = false;
  return (
    <>
      <Table className="table-hover table-striped">
        <TableHeader
          columns={columns}
          handleSort={handleSort}
          sortColumn={default_sorted_col}
        />
        <TableBody
          items={paginateDatas}
          columns={columns}
          actionButton={actionButton}
          editUrl="edit-company"
        />
      </Table>
      {show_loadmore && (
        <LoadMore
          activePage={default_active_page}
          handleClickePage={handleClickePaginationPage}
        />
      )}
    </>
  );
};
export default DefaultTableComponent;
