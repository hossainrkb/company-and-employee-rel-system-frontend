import axios from "axios";
if(localStorage.getItem("accessTokenAdmin")){
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("accessTokenAdmin");
}
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    alert("An unexpected error is occured");
  } else if (error.response.status === 400) {
    alert("Bad Req");
  } else if (error.response.status === 404) {
    alert("Not found, my be deleted");
  }
  return Promise.reject(error);
});
const http = {
  get: axios.get,
  put: axios.post,
  post: axios.post,
  delete: axios.delete,
};
export default http;
