import http from "./httpService";
export async function login(admin) {
  try {
    let {data:{access_token}}  = await http.post(`${process.env.REACT_APP_SERVER_URL}/oauth/token`, admin);
    localStorage.setItem("accessTokenAdmin", access_token);
    return Promise.resolve(access_token);
  } catch (error) {
    return Promise.reject(error);
  }
}
export function getCurrentUser() {
  try {
   return localStorage.getItem("accessTokenAdmin")?true:false;
    // return await http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/profile`);
  } catch (error) {
    return null;
  }
}
export async function logout() {
  try {
    localStorage.removeItem("accessTokenAdmin");
    return await http.post(`${process.env.REACT_APP_SERVER_URL}/api/admin/logout`);
  } catch (error) {
    return null;
  }
}

