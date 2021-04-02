function createCookie(key, value) {
  let cookie = escape(key) + "=" + escape(value) + ";";
  document.cookie = cookie;
  console.log(cookie);
  console.log("Creating new cookie with key: " + key + " value: " + value);
}

export default createCookie;
