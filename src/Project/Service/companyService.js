import http from "./httpService";
import { getAdminHeaders } from "./adminHeadersService";
import { getCompanyHeaders } from "./companyHeadersService";
require("dotenv").config();

/* From Admin panel */
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

/* From Company panel */
export function decline_leave_application(companyId,leaveId) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${companyId}/leave/${leaveId}/decline`,
    null,
    getCompanyHeaders()
  );
}
export function approve_leave_application(companyId,leaveId) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${companyId}/leave/${leaveId}/approve`,
    null,
    getCompanyHeaders()
  );
}
export function company_dashboard(id) {
  return http.post(
    `${process.env.REACT_APP_SERVER_URL}/api/company/${id}/dashboard`,
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
