export const state = () => ({
  babbleLanding: "",
  favTeam: "",
  favTeambabble: "",
  mycontests: "",
});
export const mutations = {
  mycontests(store, data) {
    store.mycontests = data;
  },
  babbleLanding(store, data) {
    store.babbleLanding = data;
  },
  favTeam(store, data) {
    store.favTeam = data;
  },
  favTeambabble(store, data) {
    store.favTeambabble = data;
  },
};
