function handlestringLength(string) {
  const temp = [];
  var result = "";
  for (var letter in string) {
    temp.push(string[letter]);
  }
  if (temp.length > 10) {
    for (let i = 0; i < 10; i++) {
      result += temp[i];
    }
    return result + "...";
  } else {
    return string;
  }
}
export default handlestringLength;
