require("dotenv").config();
import axios from "axios";
import cookies from "js-cookie";
import { setAuthToken, resetAuthToken } from "@/server/auth";
import { API_URL, NODE_ENV } from "@/env.js";

axios.defaults.baseURL = API_URL;

const token = cookies.get("auth._token.local");

if (token && token != "undefined" && token != "false") {
  setAuthToken(token);
} else {
  resetAuthToken();
}
