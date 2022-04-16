import React from "react";
import _ from "lodash";
const cursor_pointer = {
  cursor: "pointer",
};
class LoadMore extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { handleClickePage, activePage } = this.props;
    // const totalPagination = Math.ceil(totalItems / pageCount) + 1;
    // if(totalItems <= pageCount) return null;
    // const pages = _.range(1, totalPagination);
    return (
      <>
        <div className="text-center">
          <button
            className="btn btn-md btn-info"
            onClick={(e) => {
              handleClickePage(e, activePage);
            }}
          >
            Load More
          </button>
        </div>
        {/* <nav aria-label="Page navigation example">
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
        </nav> */}
      </>
    );
  }
}
export default LoadMore;
