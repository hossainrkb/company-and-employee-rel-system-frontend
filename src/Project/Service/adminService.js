import http from "./httpService";
import { getAdminHeaders } from "./adminHeadersService";
import AdminLoginCredentialContext from "../Common/AdminLoginCredentialContext";
export async function login(admin) {
  try {
    let {
      data: { access_token },
    } = await http.post(
      `${process.env.REACT_APP_SERVER_URL}/oauth/token`,
      admin
    );
    return Promise.resolve(access_token);
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getCurrentAdmin() {
  try {
    let { data } = await http.post(
      `${process.env.REACT_APP_SERVER_URL}/api/admin/profile`,
      null,
      getAdminHeaders()
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
export async function adminLogout() {
  try {
    AdminLoginCredentialContext.SetToken(null);
    return await http.post(
      `${process.env.REACT_APP_SERVER_URL}/api/admin/logout`,
      null,
      getAdminHeaders()
    );
  } catch (error) {
    return null;
  }
}
