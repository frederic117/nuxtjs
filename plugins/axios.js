import cookies from "js-cookie";
const token =
  cookies.get("auth._token.local") != "false"
    ? cookies.get("auth._token.local")
    : "";
export default ({ app: { $axios } }) => {
  $axios.setToken(token);
};
