function allZeros(list) {
  if (list.every((item) => parseInt(item) === 0)) {
    return true;
  } else {
    return false;
  }
}
export default allZeros;
