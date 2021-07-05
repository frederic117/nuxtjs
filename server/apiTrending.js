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

export function getPlayer(compet) {
  let url = `leagues/goalAndAssist/${compet}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders
    .get(url, config)
    .then((response) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(response.data);
      let resTosend = enc.decode(arr);
      return JSON.parse(resTosend);
    })
    .catch((err) => {
      throw err;
    });
}
export function getResultChampDay(compet, matchDay) {
  let url = `leagues/results/matchday/${compet}?matchday=${matchDay}`;
  return insiders.get(url).then((response) => {
    return response.data;
  });
}
export function getResultCupDay(compet, matchDay) {
  let url = `leagues/results/matchday/${compet}?stage=${matchDay}`;
  return insiders.get(url).then((response) => {
    return response.data;
  });
}
export function getCompet(compet) {
  let url = `leagues/${compet}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getMatchList(compet) {
  let url = `leagues/matchlist/${compet}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getNextMatchList(indexDate) {
  let url = `leagues/matchlist/nextmatch/` + indexDate;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getNextMatchListUnconnect() {
  let url = `leagues/matchlist/unconnect/nextmatch/`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders
    .get(url, config)
    .then((response) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(response.data);
      let resTosend = enc.decode(arr);
      return JSON.parse(resTosend);
    })
    .catch((err) => {
      throw err;
    });
}
export default insiders;
