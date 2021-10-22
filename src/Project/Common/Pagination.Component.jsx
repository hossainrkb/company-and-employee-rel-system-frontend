import React from "react";
import _ from "lodash";
const cursor_pointer = {
  cursor: "pointer",
};
class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { totalItems, pageCount, activePage, handleClickePage } = this.props;
    const totalPagination = Math.ceil(totalItems / pageCount) + 1;
    if(totalItems <= pageCount) return null;
    const pages = _.range(1, totalPagination);
    return (
      <>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className="page-item"
              onClick={
                activePage - 1 > 0
                  ? (e) => handleClickePage(e, activePage - 1)
                  : null
              }
              style={cursor_pointer}
            >
              <a className="page-link">Previous</a>
            </li>
            {pages.map((page) => (
              <li
                key={page}
                className={
                  activePage == page ? "page-item active" : "page-item"
                }
                style={cursor_pointer}
                onClick={(e) => handleClickePage(e, page)}
              >
                <a className="page-link">{page}</a>
              </li>
            ))}
            <li
              className="page-item"
              style={cursor_pointer}
              onClick={
                totalPagination - 1 > activePage
                  ? (e) => handleClickePage(e, activePage + 1)
                  : null
              }
            >
              <a className="page-link">Next</a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
export default Pagination;
