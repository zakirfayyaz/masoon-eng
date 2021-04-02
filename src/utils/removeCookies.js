import createCookie from "./handleCookie";
function removeCookies() {
  document.cookie = "Role= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}
export default removeCookies;
