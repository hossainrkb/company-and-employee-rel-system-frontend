const setToggleOrder = (currentOrder) => {
  return currentOrder == "asc" ? "desc" : "asc";
};
const TableHeader = (props) => {
  const { columns, handleSort, sortColumn } = props;
  const setIcon = (currentColumn) => {
    if (sortColumn.column == currentColumn) {
      return sortColumn.order == "asc" ? (
        <i className="fa fa-sort-alpha-down"></i>
      ) : (
        <i className="fa fa-sort-alpha-down-alt"></i>
      );
    } else {
      return <i className="fa fa-arrow-down-up"></i>;
    }
  };
  const onSort = (e, path) => {
    if (sortColumn.column == path) {
      handleSort({ column: path, order: setToggleOrder(sortColumn.order) });
    } else {
      handleSort({ column: path, order: "asc" });
    }
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            scope   = "col"
            key     = {column.label}
            onClick = {(e) => onSort(e, column.path)}
          >
            {column.label} &nbsp;
            {setIcon(column.path)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default TableHeader;
