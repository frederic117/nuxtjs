import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import cookies from "js-cookie";
import { API_URL, NODE_ENV, BACK_URL } from "@/env.js";

export default () => {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: BACK_URL,
      options: {
        query: cookies.get("auth._token.local"),
        transports: ["websocket"],
        rejectUnauthorized: false,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 15,
      },
    })
  );
};
