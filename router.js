import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    linkPrefetchedClass: "nuxt-link-prefetched",
    routes: [
      {
        path: "/loaderio-783cba52080945e6c89659df476933cd/",
        component: () =>
          import("@/components/TestLoaderio").then((m) => m.default || m),
      },
      {
        path: "/login",
        component: () =>
          import("@/components/auth/LoginPage").then((m) => m.default || m),
        name: "login",
      },
      {
        path: "/signup",
        component: () =>
          import("@/components/auth/SignupPage").then((m) => m.default || m),
        name: "signup",
      },
      {
        path: "/faq",
        component: () =>
          import("@/components/FaqPage").then((m) => m.default || m),
        name: "faq",
      },
      {
        path: "*",
        component: () =>
          import("@/components/NotFound").then((m) => m.default || m),
        name: "NotFound",
      },
      {
        path: "/notfound",
        component: () =>
          import("@/components/NotFound").then((m) => m.default || m),
        name: "Not-Found",
      },
      {
        path: "/error",
        component: () =>
          import("@/components/NotFound").then((m) => m.default || m),
        name: "error",
      },
      {
        path: "/",
        component: () =>
          import("@/components/LandingContest").then((m) => m.default || m),
        name: "landing",
      },
      {
        path: "/admin",
        component: () =>
          import("@/components/admin/AdminPage").then((m) => m.default || m),
      },
      {
        path: "/admin/plan",
        component: () =>
          import("@/components/admin/AdminPlan").then((m) => m.default || m),
      },
      {
        path: "/admin/files",
        component: () =>
          import("@/components/admin/AdminFiles").then((m) => m.default || m),
      },
      {
        path: "/admin/mail",
        component: () =>
          import("@/components/admin/AdminMail").then((m) => m.default || m),
      },
      {
        path: "/admin/classement/:id",
        component: () =>
          import("@/components/admin/AdminClassement").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/matches/:id",
        component: () =>
          import("@/components/admin/AdminMatchseason").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/teams",
        component: () =>
          import("@/components/admin/AdminAllteams").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/logs",
        component: () =>
          import("@/components/admin/AdminLog").then((m) => m.default || m),
      },
      {
        path: "/admin/contest/simulate",
        component: () =>
          import("@/components/admin/AdminSimulateContest").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/country/:id",
        component: () =>
          import("@/components/admin/AdminCountry").then((m) => m.default || m),
      },
      {
        path: "/admin/teams/:id",
        component: () =>
          import("@/components/admin/AdminTeam").then((m) => m.default || m),
      },
      {
        path: "/admin/season/:id/:insidersId",
        component: () =>
          import("@/components/admin/AdminSeason").then((m) => m.default || m),
      },
      {
        path: "/admin/season-management",
        component: () =>
          import("@/components/admin/AdminSeasonmanagement").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/matchs-management",
        component: () =>
          import("@/components/admin/AdminMatchsmanagement").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/menu",
        component: () =>
          import("@/components/adminOld/AdminMenu").then((m) => m.default || m),
      },
      {
        path: "/admin/transaction",
        component: () =>
          import("@/components/adminOld/AdminTransaction").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/contest",
        component: () =>
          import("@/components/adminOld/AdminContest").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/users",
        component: () =>
          import("@/components/adminOld/AdminUser").then((m) => m.default || m),
      },

      {
        path: "/admin/matchs",
        component: () =>
          import("@/components/adminOld/AdminMatch").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/news",
        component: () =>
          import("@/components/adminOld/AdminNews").then((m) => m.default || m),
      },
      {
        path: "/admin/sources",
        component: () =>
          import("@/components/adminOld/AdminSource").then(
            (m) => m.default || m
          ),
      },

      {
        path: "/admin/forum",
        component: () =>
          import("@/components/adminOld/AdminForum").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/matchoftheday",
        component: () =>
          import("@/components/bot/MatchOfTheDay").then((m) => m.default || m),
      },
      {
        path: "/admin/pronoslist",
        component: () =>
          import("@/components/bot/PronosList").then((m) => m.default || m),
      },
      {
        path: "/admin/coachpopularity/:shortName",
        component: () =>
          import("@/components/bot/CoachPopularity").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/admin/matchresult/:id",
        component: () =>
          import("@/components/bot/MatchResult").then((m) => m.default || m),
      },
      {
        path: "/admin/fansong",
        component: () =>
          import("@/components/adminOld/AdminFansong").then(
            (m) => m.default || m
          ),
      },
      {
        path: "/chant/team/:shortName/:id/",
        component: () =>
          import("@/components/adminOld/AdminFansong").then(
            (m) => m.default || m
          ),
        name: "/chant/team/:shortName/:id/",
      },
      {
        path: "/leagues",
        component: () =>
          import("@/components/TrendingPage").then((m) => m.default || m),
        name: "TrendingPage",
      },
      {
        path: "/teams/:shortName",
        component: () =>
          import("@/components/TeamPage").then((m) => m.default || m),
        name: "/teams/:shortName",
      },
      {
        path: "/teams/:shortName/:path",
        component: () =>
          import("@/components/TeamPage").then((m) => m.default || m),
        name: "/teams/:shortName/:path",
      },
      {
        path: "/player/:name/:id",
        component: () =>
          import("@/components/team/PlayerInfo").then((m) => m.default || m),
        name: "/player/:name/:id",
      },
      {
        path: "/publish",
        component: () =>
          import("@/components/userpage/PublishPost").then(
            (m) => m.default || m
          ),
        name: "/publish",
      },
      {
        path: "/publishm",
        component: () =>
          import("@/components/userpage/PublishPostm").then(
            (m) => m.default || m
          ),
        name: "/publishm",
      },
      {
        path: "/chat",
        component: () =>
          import("@/components/chatList").then((m) => m.default || m),
        name: "chat",
      },
      {
        path: "/chat/:username",
        component: () =>
          import("@/components/contest/chatPage").then((m) => m.default || m),
        name: "chatPage",
      },

      {
        path: "/resetpassword/:id",
        component: () =>
          import("@/components/auth/ResetPassword").then((m) => m.default || m),
        name: "/resetpassword",
      },
      {
        path: "/mypage/edit",
        component: () =>
          import("@/components/userpage/UpdateMyInfo").then(
            (m) => m.default || m
          ),
        name: "/mypage/edit",
      },
      {
        path: "/mypage",
        component: () =>
          import("@/components/userpage/MyPage").then((m) => m.default || m),
        name: "/mypage",
      },
      {
        path: "/mypage/:path",
        component: () =>
          import("@/components/userpage/MyPage").then((m) => m.default || m),
        name: "/mypage/:path",
      },
      {
        path: "/dashboard/:id",
        component: () =>
          import("@/components/userpage/UserPage").then((m) => m.default || m),
        name: "/dashboard/:id",
      },

      {
        path: "/teams/:shortName/babble/:babble_id",
        component: () =>
          import("@/components/BabbleReplyStream").then((m) => m.default || m),
        name: "/teams/:shortName/babble/:babble_id",
      },
      {
        path: "/news/babble/:babble_id",
        component: () =>
          import("@/components/BabbleReplyStream").then((m) => m.default || m),
        name: "/news/babble/:babble_id",
      },
      {
        path: "/forum/:forum_id/:forum_title",
        component: () =>
          import("@/components/ForumReply").then((m) => m.default || m),
        name: "/forum/:forum_id/:forum_title",
      },
      {
        path: "/teams/:shortName/song/:song_title/:song_id",
        component: () =>
          import("@/components/SongPage").then((m) => m.default || m),
        name: "/teams/:shortName/song/:song_title/:song_id",
      },
      {
        path: "/contest",
        component: () =>
          import("@/components/contest/ContestLanding").then(
            (m) => m.default || m
          ),
        name: "/contest",
      },
      {
        path: "/contest/create",
        component: () =>
          import("@/components/contest/CreateContest").then(
            (m) => m.default || m
          ),
        name: "/contest/create",
      },
      {
        path: "/contest/create/publik",
        component: () =>
          import("@/components/contest/CreateContest").then(
            (m) => m.default || m
          ),
        name: "/contest/create/publik",
      },
      {
        path: "/contest/create/euro",
        component: () =>
          import("@/components/contest/CreateContest").then(
            (m) => m.default || m
          ),
        name: "/contest/create/euro",
      },
      {
        path: "/contest/:mastercontestId/create-round",
        component: () =>
          import("@/components/contest/CreateContest").then(
            (m) => m.default || m
          ),
        name: "/contest/:mastercontestId/create-round",
      },
      {
        path: "/contest/leaderboard/:contestId",
        component: () =>
          import("@/components/contest/MasterContestLeaderBoard").then(
            (m) => m.default || m
          ),
        name: "/contest/leaderboard/:contestId",
      },
      {
        path: "/contest/inscription/:contestId",
        component: () =>
          import("@/components/contest/ContestInscription").then(
            (m) => m.default || m
          ),
        name: "/contest/inscription/:contestId",
      },
      {
        path: "/contest/rules/:contestId",
        component: () =>
          import("@/components/contest/ContestRules").then(
            (m) => m.default || m
          ),
        name: "/contest/rules/:contestId",
      },
      {
        path: "/contest/:contestId/message",
        component: () =>
          import("@/components/contest/ContestMainPage").then(
            (m) => m.default || m
          ),
        name: "/contest/:contestId/message",
      },
      {
        path: "/contest/:contestId",
        component: () =>
          import("@/components/contest/ContestMainPage").then(
            (m) => m.default || m
          ),
        name: "/contest/:contestId",
      },
      {
        path: "/en-direct",
        component: () =>
          import("@/components/side-component/MatchInplay").then(
            (m) => m.default || m
          ),
        name: "/en-direct",
      },
      {
        path: "/unsubscribe/:userId",
        component: () =>
          import("@/components/UnSubscribe").then((m) => m.default || m),
        name: "/unsubscribe",
      },
    ],
  });
}
