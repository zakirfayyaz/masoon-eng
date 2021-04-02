function checkEmpty(data) {
  if (data === undefined || data == null || data === "") {
    return true;
  } else {
    return false;
  }
}
export default checkEmpty;
