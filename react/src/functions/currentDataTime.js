function pad2(n) {
  return n < 10 ? "0" + n : n;
}

function getCurrTime() {
  var currTime = new Date();

  let standFormDT =
    currTime.getFullYear() +
    "-" +
    pad2(currTime.getMonth()) +
    "-" +
    pad2(
      currTime.getDate() +
        " " +
        pad2(currTime.getHours()) +
        ":" +
        pad2(currTime.getMinutes()) +
        ":" +
        pad2(currTime.getSeconds())
    );
  return standFormDT;
}

export default getCurrTime;
