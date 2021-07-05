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
export function deleteAPrivatepost(babbleId) {
  let url = `private-posts/${babbleId}`;
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
export function getBetforunconnect() {
  let url = `bets/one-from-public/`;
  return insiders
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getPrevroundincontest(contestId, roundName) {
  let url = `contest/round-history/${contestId}?roundNum=${roundName}&lookingFor=previous`;
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
export function getNextroundincontest(contestId, roundName) {
  let url = `contest/round-history/${contestId}?roundNum=${roundName}&lookingFor=next`;
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

export function getUsersforchat() {
  let url = `users/private-message/users-available/`;
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

export function getAllprivatechatbetweenUsers(users) {
  let url = `private-chats/conversation/${users}`;
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
export function getAllunreadprivatechatbyuser(userId) {
  let url = `private-chats/unread/${userId}`;
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
export function putallPrivatechatsToreadbyUser(users) {
  let url = `private-chats/read/${users}`;
  return insiders
    .patch(
      url,
      {},
      {
        headers: { Authorization: cookies.get("auth._token.local") },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return "err";
    });
}
export function postPrivatechat(message) {
  let url = "private-chats/";
  return insiders
    .post(url, message, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function deleteAPrivatechat(id) {
  let url = `private-chats/${id}`;
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

export function getMatchdayMatchProno(roundId, matchId) {
  let url = `bets/matchOfTheDay/${roundId}/match/${matchId}`;
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
export function getMatchdayRound(id) {
  let url = `bets/matchOfTheDay/round/${id}`;
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
export function getIntentPaiement(amount) {
  let url = "contest/intentPayment";
  return insiders
    .post(url, amount, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function sendIntentPayment(query) {
  let url = "transactions/intentPayment/";
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

export function buyFootcoin(query) {
  let url = "transactions/buy/";
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
export function sellFootcoin(query) {
  let url = "transactions/sell/";
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
export function getTransactionsByQuery(query) {
  let url = `transactions/getByQuery/`;
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
export function getTransactionsByUser(userId) {
  let url = `transactions/getByUser/${userId}`;
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
export function getuserfootCoins(userId) {
  let url = `transactions/wallet/${userId}`;
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
export function getByQueryContest(query) {
  let url = "contest/getByQuery/";
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
export function getByQueryRound(query) {
  let url = "contest/round/getByQuery/";
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
export function getActiveRound() {
  let url = "admin/all-round-active";
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
export function createPublicContest(contest) {
  let url = "admin/contest/public";
  return insiders
    .post(url, contest, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function sendFileToAws(file, config) {
  let url = "aws";
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

export function getBetsByQuery(query) {
  let url = `bets/getByQuery/`;
  return insiders
    .post(url, query, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return "err";
    });
}
export function takeAbet(query) {
  let url = `bets/take/`;
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
export function modifyAbet(id, querry) {
  let url = `bets/modify/${id}`;
  return insiders
    .patch(url, querry, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getAllMyContests() {
  let url = `contest/mycontests`;
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

export function getMasterContest(id) {
  let url = `contest/master-contest/` + id;
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

export function getAvailablePointsToBetOnRound(roundId) {
  let url = `contest/round/getPoints/${roundId}`;
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

export function createMatchlistContestNat(competeSelected) {
  let url = `contest/create-matchlist-national/${competeSelected}`;
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
export function createMatchlistContest(competeSelected) {
  let url = `contest/create-matchlist-contest`;
  return insiders
    .post(url, competeSelected, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getContestMatchList(contestId) {
  let url = `contest/matchWithPositions/${contestId}`;
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
export function getNbOfUsersContest(contestId) {
  let url = `leaderboard/nbusers/contest/${contestId}`;

  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    });
}

export function getLastProno(contestId) {
  let url = `contest/positions/${contestId}`;
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

export function getPositionContest(userId, contestId) {
  let url = `bets/getByQuery?userPic=false`;
  let query = {};
  query.cave = false;
  query.user = userId;
  query.round = contestId;

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

export function getAllPositionsContest(contestId) {
  let url = `bets/getByQuery?userPic=true`;
  let query = {};
  query.cave = false;
  query.round = contestId;

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

export function getUnReadPrivatePostForUser(contestId) {
  let url = `private-posts/unread/${contestId}`;
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
export function setPrivatePostReadForUser(contestId) {
  let url = `private-posts/read/${contestId}`;
  return insiders
    .post(
      url,
      { contestId },
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

export function getTimelinePost(contestId, lastid) {
  let url = `private-posts/${contestId}?last_id=${lastid}`;
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
export function deleteAPrivatePost(id) {
  let url = `private-posts/${id}`;
  return insiders
    .delete(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}

export function sendPrivatePost(babble) {
  let url = `private-posts/`;
  return insiders
    .post(url, babble, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return null;
    });
}
export function sendPrivatpostreply(babble, babbleid) {
  let url = `private-posts/resp/comment?respto=${babbleid}`;
  return insiders
    .post(
      url,
      {
        babble,
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
export function getContestList() {
  let url = "contest/";
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
export function getMatchsList() {
  let url = "contest/matchs";
  return insiders
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
export function checkContestActive() {
  let url = "contest/active";

  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    });
}

export function getContestActive(contestId) {
  let url = "contest/active/" + contestId;

  return insiders
    .get(url, {
      headers: { Authorization: cookies.get("auth._token.local") },
    })
    .then((response) => {
      return response.data;
    });
}
export function getMasterContestLeaderboard(contestId) {
  let url = "contest/masterLeaderboard/" + contestId;
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

export function getContestLeaderboard(roundId) {
  let url = `contest/round/leaderboard/${roundId}`;
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

export function getContestMain(roundId) {
  let url = `contest/round/getInfo/${roundId}`;
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

export function deleteContest(contestId) {
  let url = "contest/close/" + contestId;
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function createContest(
  contestName,
  scope,
  winnerRules,
  betValue,
  nbPlayersTargets,
  image
) {
  let url = "contest/";
  return insiders
    .post(
      url,
      {
        contestName,
        scope,
        winnerRules,
        betValue,
        nbPlayersTargets,
        image,
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

export function createRound(
  scope,
  winnerRules,
  betValue,
  nbPlayersTargets,
  masterContestId
) {
  let url = "contest/round/";
  return insiders
    .post(
      url,
      {
        scope,
        winnerRules,
        betValue,
        nbPlayersTargets,
        masterContestId,
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

export function registerContest(contestId) {
  let url = "contest/register/" + contestId;
  return insiders
    .post(
      url,
      { contestId },
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
export function sendMailToCompetitor(emailList, emailObject, emailText) {
  let url = "contest/sendmail";
  return insiders
    .post(
      url,
      {
        emailList: emailList,
        emailText: emailText,
        emailObject: emailObject,
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

export function removePositionContest(teamName, watchitem_id) {
  let url = `contest/${teamName}/watchitem/${watchitem_id}`;
  return insiders
    .patch(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
}

export function getContestHistory(contest_id) {
  let url = `contest/history/${contest_id}`;
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

export function sendServerForPay(contest_id, token, amount) {
  let url = `contest/pay/`;
  return insiders
    .post(
      url,
      {
        contest_id: contest_id,
        token: token,
        amount: amount,
      },
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

export default insiders;
