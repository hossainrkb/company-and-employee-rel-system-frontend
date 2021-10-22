import http from "./httpService";
import jwtDecode from "jwt-decode";
const END_POINT = "http://localhost:4000";
export async function login(user) {
  try {
    let {
      data: { accessToken },
    } = await http.post(`${END_POINT}/users/authenticate`, user);
    localStorage.setItem("accessToken", accessToken);
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
}
export function register(user) {
  return http.post(`${END_POINT}/users/register`, user);
}
export function getCurrentUser() {
  try {
    let accessToken = localStorage.getItem("accessToken");
    return jwtDecode(accessToken);
  } catch (error) {
    return null;
  }
}
