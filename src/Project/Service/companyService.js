import http from "./httpService";
require('dotenv').config()

export async function all_company() {
  return await http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/companies`);
}
export function add_company(company) {
  return http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/add-companies`, company);
}

