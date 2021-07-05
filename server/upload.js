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

export function sendFileToAws(file, config, supperSecretname) {
  let url = `aws/${supperSecretname}`;
  return insiders
    .post(url, file, config, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function sendFileToAwsOffice(file, config, supperSecretname) {
  let url = `aws/office/${supperSecretname}`;
  return insiders
    .post(url, file, config, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function sendFileToAwsClient(file, config, supperSecretname) {
  let url = `aws/client/${supperSecretname}`;
  return insiders
    .post(url, file, config, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function deleteUpload(id) {
  let url = "uploads/" + id;
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
