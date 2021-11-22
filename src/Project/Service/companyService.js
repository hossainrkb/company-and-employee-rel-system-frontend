import http from "./httpService";
import { getAdminHeaders } from "./adminHeadersService";
require("dotenv").config();

export async function all_company() {
  return await http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/admin/companies`,
    null,
    getAdminHeaders()
  );
}
export function add_company(company) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/admin/add-company`,
    company,
    getAdminHeaders()
  );
}
export function update_company(company, id) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/admin/${id}/update-company`,
    company,
    getAdminHeaders()
  );
}
export function destroy_company(id) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/admin/${id}/destroy-company`,
    null,
    getAdminHeaders()
  );
}

export async function login(company) {
  try {
    let {
      data: { access_token },
    } = await http.post(
      `${process.env.REACT_APP_SERVER_URL}/oauth/token`,
      company
    );
    localStorage.setItem("accessTokenCompany", access_token);
    return Promise.resolve(access_token);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getCurrentCompany() {
  try {
    let header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessTokenCompany"),
      },
    };
    let { data } = await http.post(
      `${process.env.REACT_APP_SERVER_URL}/api/company/profile`,
      null,
      header
    );
    if (data.status == "ok") {
      return Promise.resolve(data);
    } else {
      return Promise.reject(error);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function logout() {
  try {
    localStorage.removeItem("accessTokenCompany");
    return await http.post(
      `${process.env.REACT_APP_SERVER_URL}/api/company/logout`
    );
  } catch (error) {
    return null;
  }
}
