require("dotenv").config();
import axios from "axios";
import { API_URL, NODE_ENV } from "@/env.js";

import cookies from "js-cookie";
const insiders = axios.create({
  baseURL: API_URL,
});
const token = cookies.get("auth._token.local");
if (token && token != "undefined" && token != "false") {
  axios.defaults.headers.common["Authorization"] = cookies.get(
    "auth._token.local"
  );
} else {
  if (axios.defaults && axios.defaults.headers) {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function searchAll(search) {
  let url = `search/all`;
  let query = {
    search: search,
  };
  return insiders.post(url, query).then((response) => {
    return response.data;
  });
}
export function searchUser(search) {
  let url = `search/user?search=${search}`;
  return insiders.get(url).then((response) => {
    return response.data;
  });
}

export function searchTeam(search) {
  let url = `search/team?search=${search}`;
  return insiders.get(url).then((response) => {
    return response.data;
  });
}

export function searchForum(search) {
  let url = `search/forum?search=${search}`;
  return insiders.get(url).then((response) => {
    return response.data;
  });
}

export default insiders;
