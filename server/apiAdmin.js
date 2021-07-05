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

export function getLogs() {
  let url = `logs`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function testSimulatePriceCOntest(
  nbOfParticipants,
  betValue,

  isSpecialEvent,
  isPublic
) {
  let url = `bets/price/test?nbOfParticipants=${nbOfParticipants}&betValue=${betValue}&isSpecialEvent=${isSpecialEvent}&isPublic=${isPublic}`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function createUser(user) {
  let url = `users/`;
  return insiders.post(url, user).then((response) => {
    return response.data;
  });
}
export function createBot(bot) {
  let url = `users/bot/`;
  return insiders.post(url, bot).then((response) => {
    return response.data;
  });
}
export function getBotByQuery(query) {
  let url = `users/bot/getByQuery/`;
  return insiders.post(url, query).then((response) => {
    return response.data;
  });
}
export function updateBot(botId, bot) {
  let url = `users/bot/${botId}`;
  return insiders.patch(url, bot).then((response) => {
    return response.data;
  });
}
export function getUsersList() {
  let url = "users/getByQuery";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.post(url, {}, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resTosend = enc.decode(arr);
    return JSON.parse(resTosend);
  });
}
export function getNextMatchListBot(indexDate) {
  let url = `leagues/matchlist/nextmatch/${indexDate}?bigmatchs=true`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resTosend = enc.decode(arr);
    return JSON.parse(resTosend);
  });
}
export function getMatchResultBot(id) {
  let url = `matchs/result/${id}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resTosend = enc.decode(arr);
    return JSON.parse(resTosend);
  });
}
export function getAllBot() {
  let url = `admin/users/bots`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getTeam(teamName) {
  let url = "admin/teams/" + teamName;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resTosend = enc.decode(arr);
    return JSON.parse(resTosend);
  });
}

export function getAllTeams() {
  let url = `admin/teams/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getAllTopic() {
  let url = `admin/forum/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function teamDelete(teamId) {
  let url = `admin/teams/delete/` + teamId;
  return insiders
    .delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function teamCreate(newteam) {
  let url = `admin/teams/create/`;
  return insiders
    .post(url, newteam)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getAllMatchs() {
  let url = `admin/matchs/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function matchDelete(teamId) {
  let url = `admin/matchs/delete/` + teamId;
  return insiders
    .delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function matchCreate(newteam) {
  let url = `admin/matchs/create/`;
  return insiders
    .post(url, newteam)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function teamUpdate(teamModal) {
  let url = `admin/teams/edit`;
  return insiders
    .patch(url, teamModal)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function matchUpdate(
  _id,
  competition,
  status,
  date,
  goalsAwayTeam,
  goalsHomeTeam,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  codeMatchApi
) {
  let url = `admin/matchs/edit`;
  return insiders
    .patch(url, {
      _id,
      competition,
      status,
      date,
      goalsAwayTeam,
      goalsHomeTeam,
      homeTeamId,
      awayTeamId,
      homeTeamName,
      awayTeamName,
      codeMatchApi,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function getNewsBot(botId, source, bot) {
  let url = `admin/scrap/bot/${botId}?source=${source}`;
  return insiders
    .post(url, bot)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function userUpdate(user, userId) {
  let url = "users/" + userId;
  return insiders
    .patch(url, user, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function scoreUpdate() {
  let url = "admin/matchs/watchitem/autoclose";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function updateRoundWon() {
  let url = "admin/users/round-won";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function closePastContest() {
  let url = "admin/contests/autoclose";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function matchUpdateEvents(matchId) {
  let url = "admin/matchs/matchUpdateEvent/" + matchId;
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function competitionUpdate() {
  let url = "admin/matchs/competition/worldcup/matchs";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function competitionUpdateClub() {
  let url = "admin/matchs/competition/clubs/matchs";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function scorerUpdate() {
  let url = "admin/matchs/competition/worldcup/scorers";
  return insiders
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}
export function passUpdate() {
  let url = "admin/matchs/competition/worldcup/assists";
  return insiders
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function updateNextmatch() {
  let url = "admin/matchs/nextMatchUpdate";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function updateAllMatch() {
  let url = "admin/matchs/allMatchUpdate";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function updateNationalTeamCalendar() {
  let url = "admin/nationalTeams/calendar";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function updateSquadMercato() {
  let url = "admin/clubs/squadupdate";
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function userDelete(userId) {
  let url = `admin/users/delete/` + userId;
  return insiders
    .delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getAllNewsRss() {
  let url = `admin/news/rss`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function deleteSource(sourceId) {
  let url = `admin/source/delete/` + sourceId;
  return insiders
    .delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function startTwitter() {
  let url = `admin/news/twitter/on`;
  return insiders
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function stopTwitter() {
  let url = `admin/news/twitter/off`;
  return insiders
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function createSource(newsource) {
  let url = `admin/source/create/`;
  return insiders
    .post(url, newsource)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getAllSources() {
  let url = `admin/sources/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function getAllContests() {
  let url = `admin/all-contests/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function postTopicAdmin(title, lang, user, shortName, tags) {
  let url = `admin/forum/`;
  return insiders
    .post(url, {
      title,
      lang,
      user,
      shortName,
      tags,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function postBabbleAdmin(botId, babble, teamId, babbleUrl, babbleVideo) {
  let url = `admin/babbles`;
  return insiders
    .post(url, {
      botId: botId,
      babble: babble,
      team: teamId,
      babbleImg: babbleUrl,
      babbleVideo: babbleVideo,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function sendFansong(song) {
  let url = `fansongs/publish`;
  return insiders
    .post(url, song)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export default insiders;
