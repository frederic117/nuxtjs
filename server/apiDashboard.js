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

export function userOnline() {
  let url = "users/setOnline/on";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}

export function userOffline() {
  let url = "users/setOnline/off";
  return insiders
    .patch(
      url,
      { off: "off" },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}
////User connected info
export function getUserProfileInfo() {
  let url = "dashboards/profile";
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function getCurrentInsights() {
  let url = "dashboards/currentinsights";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders
    .get(url, config, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(response.data);
      let resTosend = enc.decode(arr);
      return JSON.parse(resTosend);
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}

export function getMyWatchList() {
  let url = "dashboards/mywatchlist";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders
    .get(url, config, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(response.data);
      let resTosend = enc.decode(arr);
      return JSON.parse(resTosend);
    })
    .catch((err) => {
      return err;
    });
}

export function getMyPastInsights() {
  let url = "dashboards/pastinsights/";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders
    .get(url, config, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(response.data);
      let resTosend = enc.decode(arr);
      return JSON.parse(resTosend);
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}

export function getMyInsidersFollowed(insiderId) {
  let url = "dashboards/insidersfollowed/" + insiderId;
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}

export function userUpdate(userUpdate) {
  let url = "dashboards/edit";
  return insiders
    .patch(url, userUpdate)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}
export function userUpdateFirst(userUpdate) {
  let url = "dashboards/onboarding";
  return insiders
    .patch(url, userUpdate, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}
export function getInsiderCurrentInsights(query) {
  let url = "bets/getByQuery?userPic=false";
  return insiders
    .post(url, query, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function uploadPicture(image) {
  const formData = new FormData();
  formData.append("image", image);
  let url = "dashboards/upload";
  return insiders
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: cookies.get("auth._token.local"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}

////Insider profile info
export function getInsiderProfileInfo(insiderId) {
  let url = "dashboards/insider/" + insiderId;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function getInsiderPastInsights(query) {
  let url = "bets/getByQuery?userPic=false";
  return insiders
    .post(url, query, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getInsiderPastInsightsRound(query) {
  let url = "bets/getByQuery?userPic=false";
  return insiders
    .post(url, query, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getInsiderInsidersFollowed(insiderId) {
  let url = "dashboards/insidersfollowed/" + insiderId;
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
      return err;
    });
  //.catch(next);
}

////Follow the user
export function followInsider(insiderId) {
  let url = `follow/${insiderId}`;
  return insiders
    .post(
      url,
      { insiderId },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

////Unollow the user
export function unfollowInsider(insiderId) {
  let url = `follow/${insiderId}`;
  return insiders
    .delete(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

////Check if user is followed
export function isFollowed(insiderId) {
  let url = "follow/" + insiderId;
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

////Get leaderboar and index of the user
export function getLeaderboard(insiderId) {
  let url = "dashboards/leaderboard/" + insiderId;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders
    .get(url, config, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      let enc = new TextDecoder("utf-8");
      let arr = new Uint8Array(response.data);
      let resTosend = enc.decode(arr);
      return JSON.parse(resTosend);
    })
    .catch((err) => {
      return err;
    });
  //.catch(next);
}
export default insiders;
