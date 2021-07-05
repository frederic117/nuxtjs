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

export function getDailyco() {
  return axios
    .get("https://api-scrapper.caprover.footfoot.co/dailyco")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {});
}
export function deleteDailyco(id) {
  return (
    axios
      //https://api-scrapper.caprover.footfoot.co/dailyco/delete

      .post("https://api-scrapper.caprover.footfoot.co/dailyco/delete", {
        id,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("errDelete", err);
      })
  );
}

export function getWhereBy() {
  return axios
    .get("https://api-scrapper.caprover.footfoot.co/whereby")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {});
}
export function deleteWhereBy(id) {
  return (
    axios
      //http://localhost:3030/whereby
      .post("https://api-scrapper.caprover.footfoot.co/whereby/delete", {
        id,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {})
  );
}
export function getUrlpreview(url) {
  return (
    axios
      //http://localhost:3030/scrap/linkpreview
      .post("https://api-scrapper.caprover.footfoot.co/scrap/linkpreview", {
        url: url,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {})
  );
}
export function postTruepushnotif(query) {
  return axios
    .post("https://api.truepush.com/api/v1/createCampaign", query, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkRGF0ZSI6MTYxODQwMjY0NzY1MiwiaWQiOiI1ZWJlM2FjMzZmZmY5YzJiZjgwMDYwM2QiLCJ1c2VySWQiOiI1ZWJlMzkxOTZmZmY5YzJiZjgwMDYwMzkiLCJpYXQiOjE2MTg0MDI2NDd9.BHES21t_6TKilIuW0hbsMBr9F7qvoYqxR1uZieTDbCw",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function unsubscribebyUserid(userId) {
  let url = `users/unsubscribe/${userId}`;
  return insiders
    .patch(
      url,
      { userId },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getAPlayerBySportsMonkId(id) {
  let url = `players/sportmonks-id/${id}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  //.catch(next);
}
export function getBabbles(insiderId, page) {
  let url = `babbles/insider/${insiderId}?page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
  //.catch(next);
}

export function getpreviousBabble(insiderId, babbleId) {
  let url = `babbles/displayone/insider/${insiderId}/previous/${babbleId}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getnextBabble(insiderId, babbleId) {
  let url = `babbles/displayone/insider/${insiderId}/next/${babbleId}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getTeam(shortName) {
  let url = "teams/" + shortName;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getPlayerVideos(sportsMonkid, page) {
  let url = `babbles/videos-player/player/${sportsMonkid}?page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function getPlayerBabbles(sportsMonkid, page) {
  let url = `babbles/player/${sportsMonkid}?page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function getTeamBabbles(teamName, sortBy, page) {
  let url = `babbles/${teamName}?page=${page}&sort=${sortBy}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function getASong(songId) {
  let url = `fansongs/displayone/${songId}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getSitemap() {
  let url = `sitemap/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function deleteAforum(forumId) {
  let url = `forums/${forumId}`;
  return insiders
    .delete(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function deleteABbbles(babbleId) {
  let url = `babbles/${babbleId}`;
  return insiders
    .delete(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function donotDeleteAbabble(babbleid) {
  let url = `babbles/do-not-delete/${babbleid}`;
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function updateAbabble(babbleid, params) {
  let url = `babbles/update/${babbleid}`;
  return insiders
    .patch(url, params, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function assignPodcastTeam(podcastid, teamId) {
  let url = `podcast/assign-team/${podcastid}`;
  let params = {
    teamId,
  };
  return insiders
    .patch(url, params, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function assignTeam(babbleId, players, teamId) {
  let url = `babbles/${babbleId}`;
  let params = {
    players,
    teamId,
  };
  return insiders
    .patch(url, params, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function askForum(forum) {
  let url = `forums/ask`;
  return insiders
    .post(url, forum, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function deleteForumReply(replyId) {
  let url = `forums/${replyId}`;
  return insiders
    .delete(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getRounds() {
  let url = "users/getRounds/";
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return "err";
    });
}

export function getUser() {
  let url = "users/userconnected";
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getMatchInplay() {
  let url = "matchs/matchlist/inplay";
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getBigMatchs(favteam) {
  let url = "matchs/matchlist/nextmatchs";
  url = favteam ? url + "?favteam=" + favteam : url;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getMatchInplayUnconnect() {
  let url = "matchs/matchlist/unconnect/inplay";
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

export function getTeamDetail(teamName) {
  let url = "teams/detail/" + teamName;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function stayWithUs(teamId) {
  let url = `teams/coach/${teamId}/stay`;
  return insiders
    .post(
      url,
      { teamId },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getOutBitch(teamId) {
  let url = `teams/coach/${teamId}/getout`;
  return insiders
    .post(
      url,
      { teamId },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function removeWatchItem(teamName, watchitem_id) {
  let url = `teams/${teamName}/watchitem/${watchitem_id}`;
  return insiders
    .delete(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function removePosition(teamName, watchitem_id) {
  let url = `teams/${teamName}/watchitem/${watchitem_id}`;
  return insiders
    .patch(
      url,
      { watchitem_id },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function beBull(teamName, inWatchList) {
  let url = `teams/${teamName}/watchitem/bull`;
  const params = {};
  if (inWatchList) params.wi = inWatchList;
  return insiders({
    method: "post",
    url,
    params,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function beBear(teamName, inWatchList) {
  let url = `teams/${teamName}/watchitem/bear`;
  const params = {};
  if (inWatchList) params.wi = inWatchList;
  return insiders({
    method: "post",
    url,
    params,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getAbo(id) {
  let url = `users/abo/${id}`;
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getTrend(teamName, nbDays) {
  let url = "teams/" + teamName + "bull-bear-trend?history=" + nbDays;
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
      throw err;
    });
}
export function getFanSong(page, shortName) {
  let url = `fansongs/?team=${shortName}&page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getPodcast(shortName, page) {
  let url = shortName
    ? `podcast/?team=${shortName}&page=${page}`
    : `podcast/?page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getPodcastByUser(userId, page) {
  let url = `podcast/?user=${userId}&page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getAllLastnews() {
  let url = `babbles/desktop/last-news/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function getGoalsVideos(teamName, page) {
  let url = `babbles/videos-team/${teamName}?page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getTeamBabblesUnconnected(teamName, sortBy, page) {
  let url = `babbles/unconnected/team/${teamName}?page=${page}&sort=${sortBy}`;
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

export function getBabblesSuggest(babbleid) {
  let url = `babbles/suggest/${babbleid}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getWatchInsight() {
  let url = `bets/today/`;
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function sendBabble(babblePost) {
  let url = `babbles/post`;

  return insiders
    .post(url, babblePost, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function postLike(like) {
  let url = `babbles/like`;
  return insiders
    .post(url, like, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function postUnlike(like) {
  let url = `babbles/unlike`;
  return insiders
    .post(url, like, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function postLikeReply(babbleRespId) {
  let url = `babbles/like/reply`;
  return insiders
    .post(
      url,
      {
        babbleRespId: babbleRespId,
      },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function postLikeForumReply(forumRespId) {
  let url = `forums/like/` + forumRespId;
  return insiders
    .post(
      url,
      { forumRespId },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function postLikeFansong(fansongId) {
  let url = `fansongs/like/` + fansongId;
  return insiders
    .post(
      url,
      { fansongId },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
////export function postLikeForum(forumId) {
////  let url = `forums/like`;
////  return insiders
////    .post(url, {
////      forumId: forumId
////    })
////    .then(response => {
////      return response.data;
////    })
////    .catch(err => {
////      return null;
////    });
////}

export function getRecentPosition() {
  let url = `watchitems/positions`;
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function sendBabbleReply(babble, babbleid, babbleUrl, babbleVideo) {
  let url = `babbles/resp?respto=${babbleid}`;
  return insiders
    .post(
      url,
      {
        babble: babble,
        babbleImg: babbleUrl,
        babbleVideo: babbleVideo,
      },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function sendSongReply(babble, babbleid, babbleUrl, babbleVideo) {
  let url = `fansongs/resp?respto=${babbleid}`;
  return insiders
    .post(
      url,
      {
        babble: babble,
        babbleImg: babbleUrl,
        babbleVideo: babbleVideo,
      },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function sendForumReply(babble, forumid, forumUrl, forumVideo) {
  let url = `forums/resp?respto=${forumid}`;
  return insiders
    .post(
      url,
      {
        babble: babble,
        forumImg: forumUrl,
        forumVideo: forumVideo,
      },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function sendBabbleReplyComment(babble, babbleid) {
  let url = `babbles/resp/comment?respto=${babbleid}`;
  return insiders
    .post(
      url,
      {
        babble: babble,
      },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function sendForumReplyComment(babble, forumid) {
  let url = `forums/resp/comment?respto=${forumid}`;
  return insiders
    .post(
      url,
      {
        babble: babble,
      },
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getAUser(userid) {
  let url = `user/info/${userid}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getAllTeams() {
  let url = `teams?index=all`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getAllTeamsNav() {
  let url = `teams/nav`;
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
export function getClapBabbles(userId, page) {
  let url = `babbles/user/prefered/${userId}?page=${page}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getAllBabbles(sortBy, page, userId) {
  let url = "";
  if (userId) {
    url = `babbles/?page=${page}&sort=${sortBy}&user=${userId}`;
  } else {
    url = `babbles/?page=${page}&sort=${sortBy}`;
  }
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getVideo(sortBy, page, userId) {
  let url = "";
  if (userId) {
    url = `babbles/videos/?page=${page}&sort=${sortBy}&user=${userId}`;
  } else {
    url = `babbles/videos/?page=${page}&sort=${sortBy}`;
  }
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getABabble(babbleId) {
  let url = `babbles/displayone/${babbleId}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getAllBabblesUnconnected(sortBy, page) {
  let url = `babbles/unconnected/news/?page=${page}&sort=${sortBy}`;
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
export function getAllForums(page, team) {
  let url = `forums/?page=${page}&team=${team}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getWhotofollow() {
  let url = `follow/who-to-follow`;
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getAForum(forumId) {
  let url = `forums/displayone/${forumId}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function getNbOfUsers() {
  let url = `leaderboard/nbusers`;
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
      throw err;
    });
}

export function getLeaderBoard() {
  let url = `leaderboard/alltime`;
  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export default insiders;
