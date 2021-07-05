require("dotenv").config();
import axios from "axios";
import cookies from "js-cookie";

function errHandler(err) {
  console.error("API", err);
}

const auth = axios.create({
  baseURL: process.env.API_URL,
});

export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = token;
}

export function resetAuthToken() {
  if (axios.defaults && axios.defaults.headers) {
    delete axios.defaults.headers.common["Authorization"];
  }
}
export function login(email, password) {
  return auth
    .post("login", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function signup(userInfo) {
  return auth.post("signup", userInfo).then((response) => {
    return response.data;
  });
}

export function sendForgetPassword(email) {
  return auth
    .post("forgot_password", {
      email,
    })
    .then((response) => {
      return response.data;
    });
}
export function resetMyPassword(userId, password) {
  return auth
    .post("new_password/" + userId, {
      password,
    })
    .then((response) => {
      return response.data;
    });
}
