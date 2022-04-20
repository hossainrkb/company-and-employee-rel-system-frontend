import http from "./httpService";
import { getCompanyHeaders } from "./companyHeadersService";
import { getEmployeeHeaders } from "./employeeHeadersService";
import EmployeeLoginCredentialContext from "../Common/EmployeeLoginCredentialContext";
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
///////////////////////////////////////////////////////////
// EmpLoyeee Panel
///////////////////////////////////////////////////////////

export async function login(company) {
  try {
    let {
      data: { access_token },
    } = await http.post(
      `${process.env.REACT_APP_SERVER_URL}/oauth/token`,
      company
    );
    localStorage.setItem("accessTokenEmployee", access_token);
    return Promise.resolve(access_token);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function employeeLogout(id) {
  try {
    EmployeeLoginCredentialContext.SetToken(null);
    return await http.post(
      `${process.env.REACT_APP_SERVER_URL}/api/employee/logout`,null, getEmployeeHeaders()
    );
  } catch (error) {
    return null;
  }
}

export async function getCurrentEmployee() {
  try {
    let { data } = await http.post(
      `${process.env.REACT_APP_SERVER_URL}/api/employee/profile`,
      null,
      getEmployeeHeaders()
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
export function checkin_employee(id,data) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/employee/${id}/check-in`,
    data,
    getEmployeeHeaders()
  );
}
export function checkout_employee(id,data) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/employee/${id}/check-out`,
    data,
    getEmployeeHeaders()
  );
}
export function emp_leave_application(id,data) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/employee/${id}/leave-application-employee`,
    data,
    getEmployeeHeaders()
  );
}
export function emp_leave_application_logs(id) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/employee/${id}/leave-application-logs`,
    null,
    getEmployeeHeaders()
  );
}