import React, { PureComponent, Component } from "react";
import { withRouter } from "react-router";
class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      activePage: 1,
      pageCount: 5,
      sortColumn: props.sortColumn?props.sortColumn:{},
    };
  }
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  storeData = (data,id) => {
    let parseData = {...data,id:id};
    let updateDatas = [parseData, ...this.state.datas];
    this.setState({ datas: updateDatas });
  };
  updateData = (data, id) => {
    let updateDatas = this.state.datas.map((e) => {
      if (e.id == id) {
        return data;
      } else {
        return e;
      }
    });
    this.setState({ datas: updateDatas });
  };
  deleteData = async (e, id) => {
    if(!confirm('Are You Sure to Delete?'))return;
    let {data} = await this.props.destroyEmployee(id);
    if(data.status == "ok"){
      alert(data.message)
      let deletedatas = this.state.datas.filter((e) => e.id != id);
      this.setState({ datas: deletedatas });
    }
  };
  sortData = () => {
    const { sortColumn, datas } = this.state;
    let sortedList = _.orderBy(datas, [sortColumn.column], [sortColumn.order]);
    return sortedList;
  };
  paginateDatas = (datas) => {
    const { activePage, pageCount } = this.state;
    const start = (activePage - 1) * pageCount;
    let updateDatas = [];
    updateDatas = datas.slice(start, start + pageCount);
    return updateDatas;
  };
  handleClickePaginationPage = (e, page) => {
    this.setState({ ...this.state, activePage: page });
  };
  showData = (id) => {
    let updatedatas = [...this.state.datas];
    let filtered = updatedatas.filter((e) => e.id == id);
    return filtered[0];
  };
  editData = (e, id,url) => {
    this.props.history.push(`/${url}/${id}`);
  };
  setDataToState = ({data}) => {
    this.setState({ datas: data });
  };
  async componentDidMount () {
    if(this.props.populateBaseArray){
      if (this.props.match.params.documentID) {
        this.setDataToState(await this.props.populateBaseArray(this.props.match.params.documentID))
      }else{
        this.setDataToState(await this.props.populateBaseArray())
      }
    }
  }

  render() {
    const { sortColumn, activePage, pageCount } = this.state;
    const sorteddatas = this.sortData();
    const paginateDatas = this.paginateDatas(sorteddatas);
    const returnableState = {
      sortedDatas: sorteddatas,
      storeData: this.storeData,
      updateData: this.updateData,
      paginateDatas: paginateDatas,
      sortColumn: sortColumn,
      handleSort: this.handleSort,
      editData: this.editData,
      deleteData: this.deleteData,
      showData: this.showData,
      handleClickePaginationPage: this.handleClickePaginationPage,
      activePage: activePage,
      pageCount: pageCount,
    };
    return this.props.children(returnableState);
  }
}
export default withRouter(Crud);
