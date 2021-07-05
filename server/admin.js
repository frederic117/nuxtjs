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

export function initCote(matchId) {
  let url = `matchs/match-trending/${matchId}`;
  return insiders.patch(url).then((response) => {
    return response.data;
  });
}
export function patchHeadTohead(matchSportMonksId) {
  let url = `matchs/head2head/${matchSportMonksId}`;
  return insiders.patch(url).then((response) => {
    return response.data;
  });
}
export function ciesUpdate() {
  let url = `admin/cies-find-id`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}
export function updateNameTeams() {
  let url = `teams/updateTeam/updateName/setup`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}
export function updateFootballData() {
  let url = "jobs/updateFootballData";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function getExcelTeams() {
  let url = "teams/excel/export";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function getExcelPlayers() {
  let url = "players/excel/export";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function createPlayers(sportmonksId) {
  let url = `players/create-many/${sportmonksId}`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}
export function updateLiveStanding(seasonId) {
  let url = `standing/refreshData/${seasonId}`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}

export function calculateBetsOnFinishedMatch(matchId) {
  let url = `bets/calculate/${matchId}`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}
export function chargeFormeandMatchlist(teamSportMonksId) {
  let url = `teams/updateTeamResults/${teamSportMonksId}`;
  return insiders.patch(url).then((response) => {
    return response.data;
  });
}
export function getCountryAndLeaguesFromSportsMonk() {
  let url = "country/sportmonks-plan";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}

export function getCountryFromInsiders() {
  let url = "country";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}

export function createCountryForInsiders(country) {
  let url = "country";
  return insiders.post(url, country).then((response) => {
    return response.data;
  });
}
export function getLeaguesFromSportsMonk(countryId) {
  let url = `league/sportmonks-plan/${countryId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function getLeagueFromInsidersByCountryId(countryId) {
  let url = `league/country/${countryId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function getLeaguesFromInsiders() {
  let url = "league";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function createLeagueForInsiders(league) {
  let url = "league";
  return insiders.post(url, league).then((response) => {
    return response.data;
  });
}
export function patchLeagueForInsiders(league, leagueId) {
  let url = `season/${leagueId}`;
  return insiders.patch(url, league).then((response) => {
    return response.data;
  });
}
export function getSeasonFromSportsMonk(leagueId) {
  let url = `season/sportmonks-plan/${leagueId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function getSeasonByLeagueFromInsiders(leagueId) {
  let url = `season/league/${leagueId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}

export function refreshDataBySeason(seasonId) {
  let url = `season/refreshData/${seasonId}`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}
export function refreshDataByStanding(seasonId) {
  let url = `standing/refreshData/${seasonId}`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}
export function createSeasonForInsiders(season) {
  let url = "season";
  return insiders.post(url, season).then((response) => {
    return response.data;
  });
}
export function updateMatchsBySeason(seasonId) {
  let url = `matchs/updateBySeasonId/${seasonId}`;
  return insiders.post(url).then((response) => {
    return response.data;
  });
}

export function updateNextMatchs() {
  let url = "teams/updateNextMatch/allSeasons";
  return insiders.patch(url).then((response) => {
    return response.data;
  });
}
export function updateNextMatchsBySeason(seasonId) {
  let url = `teams/updateNextMatch/${seasonId}`;
  return insiders.patch(url).then((response) => {
    return response.data;
  });
}

export function liaiseWithSeason(seasonId) {
  let url = `teams/liaiseWithSeason/${seasonId}`;
  return insiders.patch(url).then((response) => {
    return response.data;
  });
}
export function getSeasonbyquery(query) {
  let url = "season/getByQuery/light";
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.post(url, query, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}

export function getTeamsBySeasonFromSportsMonk(seasonId) {
  let url = `teams/sportmonks-plan/${seasonId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function updateAteambyId(id) {
  let url = `teams/updateTeam/${id}`;
  return insiders.patch(url).then((response) => {
    return response.data;
  });
}
export function getTeamsBySeasonFromInsiders(ids) {
  let url = `teams/get-by-sportmonksId`;
  return insiders.post(url, ids).then((response) => {
    return response.data;
  });
}
export function patchTeamForInsiders(id, team) {
  let url = `teams/${id}`;
  return insiders.patch(url, team).then((response) => {
    return response.data;
  });
}
export function createTeamForInsiders(team) {
  let url = "teams";
  return insiders.post(url, team).then((response) => {
    return response.data;
  });
}
export function modifyTeamForInsiders(team, teamId) {
  let url = `teams/${teamId}`;
  return insiders.patch(url, team).then((response) => {
    return response.data;
  });
}

export function getAllteams(query) {
  let config = {
    responseType: "arraybuffer",
  };
  let url = `teams/getByQuery`;
  return insiders.post(url, query, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let teams = enc.decode(arr);
    return JSON.parse(teams);
  });
}

export function modifySeasonForInsiders(season, seasonId) {
  let url = `season/${seasonId}`;
  return insiders.patch(url, season).then((response) => {
    return response.data;
  });
}
export function createAllMAtchesFromLeagueForInsiders(matchs) {
  let url = "matchs/matchList";
  return insiders.post(url, matchs).then((response) => {
    return response.data;
  });
}
export function getMatchsFromSportsMonkBySeasonId(seasonId) {
  let config = {
    responseType: "arraybuffer",
  };
  let url = `matchs/sportmonks-plan/${seasonId}`;
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let leagues = enc.decode(arr);
    return JSON.parse(leagues);
  });
}

export function getMatchsBySeason(seasonId) {
  let config = {
    responseType: "arraybuffer",
  };
  let url = `matchs/get-by-season/${seasonId}`;
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let matches = enc.decode(arr);
    return JSON.parse(matches);
  });
}
export function getOneMatch(matchId) {
  let url = `matchs/${matchId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function createOneMatch(match) {
  let url = "match";
  return insiders.post(url, match).then((response) => {
    return response.data;
  });
}
export function modifyOneMatch(match, matchId) {
  let url = `matchs/${matchId}`;
  return insiders.patch(url, match).then((response) => {
    return response.data;
  });
}
export function updateOneMatch(match, matchId) {
  let url = `matchs/update-info/${matchId}`;
  return insiders.patch(url, match).then((response) => {
    return response.data;
  });
}

export function getStandingsFromSportsMonkByseasonId(seasonId) {
  let url = `standing/sportmonks-plan/${seasonId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}

export function createStandings(standing) {
  let url = `standing`;
  return insiders.post(url, standing).then((response) => {
    return response.data;
  });
}
export function getStandingsFromInsidersByseasonId(seasonId) {
  let url = `standing/get-by-seasonId/${seasonId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function updateOneStanding(standing, standingId) {
  let url = `standing/update-info/${standingId}`;
  return insiders.patch(url, standing).then((response) => {
    return response.data;
  });
}

export function getPlayersByTeam(teamId) {
  let url = `player/team/${teamId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function getPlayersBySeason(seasonId) {
  let url = `player/season/${seasonId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}

export function getOnePlayer(playerId) {
  let url = `player/${playerId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}

export function modifyOnePlayer(player, playerId) {
  let url = `player/${playerId}`;
  return insiders.patch(url, player).then((response) => {
    return response.data;
  });
}

export function updateOnePlayer(player, playerId) {
  let url = `player/update-info/${playerId}`;
  return insiders.patch(url, player).then((response) => {
    return response.data;
  });
}

export function getCoachsBySeason(seasonId) {
  let url = `coach/season/${seasonId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function getOneCoach(coachId) {
  let url = `coach/${coachId}`;
  let config = {
    responseType: "arraybuffer",
  };
  return insiders.get(url, config).then((response) => {
    let enc = new TextDecoder("utf-8");
    let arr = new Uint8Array(response.data);
    let resToSend = enc.decode(arr);
    return JSON.parse(resToSend);
  });
}
export function modifyOneCoach(coach, coachId) {
  let url = `coach/${coachId}`;
  return insiders.patch(url, coach).then((response) => {
    return response.data;
  });
}
export function updateOneCoach(coach, coachId) {
  let url = `coach/update-info/${coachId}`;
  return insiders.patch(url, coach).then((response) => {
    return response.data;
  });
}
