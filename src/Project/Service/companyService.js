import http from "./httpService";
import {getAdminHeaders} from './headers';
require('dotenv').config()

export async function all_company() {
  return await http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/companies`,null,getAdminHeaders());
}
export function add_company(company) {
  return http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/add-company`, company,getAdminHeaders());
}
export function update_company(company,id) {
  return http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/${id}/update-company`, company,getAdminHeaders());
}
export function destroy_company(id) {
  return http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/${id}/destroy-company`, null,getAdminHeaders());
}


