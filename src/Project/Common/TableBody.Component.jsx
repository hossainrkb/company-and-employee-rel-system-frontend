const TableBody = ({ items, columns ,actionButton,editUrl}) => {
  // const renderCell = (column, item,index) => (<td scope="col" key={index} >{column.content(item)}</td>)
  const renderCell = (column, item,index) => {
    if(column.content){
      return (<td scope="col" key={index} >{column.content(item)}</td>);
    }else{
      let editicon = actionButton?actionButton[0].edit.icon:"";
      let editclassName = actionButton?actionButton[0].edit.className:"";
      let editClick = actionButton?actionButton[0].edit.onclickHandle:"";
      let deleteicon = actionButton?actionButton[1].delete.icon:"";
      let deleteclassName = actionButton?actionButton[1].delete.className:"";
      let deleteClick = actionButton?actionButton[1].delete.onclickHandle:"";
      return (
      <td scope="col" key={`${index} ${item.id}`} >
        <i className={`${editicon} ${editclassName}`} onClick={(e)=>{editClick(e,item.id,editUrl)}}></i> &nbsp;
      <i className={`${deleteicon} ${deleteclassName}`} onClick={(e)=>{deleteClick(e,item.id)}}></i>
      </td>
      );
    }
  }
  return (
    <tbody>
      {items.map((item, idx) => {
        return (
          <tr key={`${idx} ${item.id}`}>
            {columns.map((column,index) => renderCell(column, item,index))}
          </tr>
        );
      })}
    </tbody>
  );
};
export default TableBody;
