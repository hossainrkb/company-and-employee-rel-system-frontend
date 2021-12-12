import http from "./httpService";
import { getCompanyHeaders } from "./companyHeadersService";
require("dotenv").config();

export async function all_employee(companyID) {
  return await http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${companyID}/list-employee`,
    null,
    getCompanyHeaders()
  );
}
export function add_employee(employee,companyID) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${companyID}/add-employee`,
    employee,
    getCompanyHeaders()
  );
}
export function edit_employee(companyID, id) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${companyID}/employee/${id}/edit`,
    null,
    getCompanyHeaders()
  );
}
export function update_employee(employee,companyID, id) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${companyID}/employee/${id}/update`,
    employee,
    getCompanyHeaders()
  );
}
export function destroy_employee(companyID,id) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${companyID}/employee/${id}/delete`,
    null,
    getCompanyHeaders()
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
