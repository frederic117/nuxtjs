import { getUser } from "~/server/api";

export const state = () => ({
  connectedUser: "Unauthorized",
  champSelected: "",
  langSelected: "",
  MyDashBoardResult: "",
  contestInscriptionId: "",
  uploadImage: "",
  lastPath: "",
  userTospeak: "",
  insiderWantsTotalk: [],
  usersOnlinelist: [],
  mypage: "",
  babbleTodisplay: "",
  darkTheme: false,
  insidersTospeak: [],
  firstBet: "",
  pronoUnconnect: "",
  token: "",
  conversationWithinsider: "",
  maskBottomnav: false,
  isSafari: "",
  newMessage: "",
  matches: "",
  watchInsight: "",
  pronoEncours: "",
});
export const mutations = {
  pronoEncours(store, data) {
    store.pronoEncours = data;
  },
  pushconversationWithinsider(store, data) {
    store.conversationWithinsider.push(data);
  },
  pushInsiderWantsTotalk(store, data) {
    store.insiderWantsTotalk.push(data);
  },
  watchInsight(store, data) {
    store.watchInsight = data;
  },
  matches(store, data) {
    store.matches = data;
  },
  newMessage(store, data) {
    store.newMessage = data;
  },
  isSafari(store, data) {
    store.isSafari = data;
  },
  maskBottomnav(store, data) {
    store.maskBottomnav = data;
  },
  conversationWithinsider(store, data) {
    store.conversationWithinsider = data;
  },
  token(store, data) {
    store.token = data;
  },
  insiderWantsTotalk(store, data) {
    store.insiderWantsTotalk = data;
  },
  pronoUnconnect(store, data) {
    store.pronoUnconnect = data;
  },
  firstBet(store, data) {
    store.firstBet = data;
  },
  setInsidersTospeak(store, data) {
    store.insidersTospeak = data;
  },
  dark(store, data) {
    store.darkTheme = data;
  },
  setbabbaleTodisplay(store, babble) {
    store.babbleTodisplay = babble;
  },
  setmypage(store, mypage) {
    store.mypage = mypage;
  },
  userOnline(store, users) {
    store.usersOnlinelist = users;
  },

  speak(store, userTospeak) {
    store.userTospeak = userTospeak;
  },
  setNewValue(store, ligue) {
    store.champSelected = ligue;
  },
  setNewLang(store, lang) {
    store.langSelected = lang;
  },
  bringMeToMyDashBoardResult(store) {
    store.MyDashBoardResult = "pastinsights";
  },
  contestInscription(store, id) {
    store.contestInscriptionId = id;
  },
  setUploadImage(store, uploadImage) {
    store.uploadImage = uploadImage;
  },
  setLastPath(store, lastPath) {
    store.lastPath = lastPath;
  },
  set_user(store, data) {
    store.connectedUser = data;
  },
  set_user_unauthorized(store) {
    store.connectedUser = "Unauthorized";
  },
};
////export const actions = {
////  fetch({ commit }) {
////return getUser()
////      .then((response) => {
////       commit("set_user", response);
////       return response;
////      })
////     .catch((error) => {
////   commit("set_user_unauthorized", error);
////    return error;
////  });
////  },
////};
