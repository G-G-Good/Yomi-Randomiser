//jshint esversion: 6
var seed;
var chars;
var losers;
var pick1, pick2, pick3, pick4, pick5;
const box = document.getElementById("box");

let randomInt = max => Math.floor(Math.random() * Math.floor(max));
let removeAtIndex = (arr, index) => {
  let final = arr;
  for (i in arr) {
    if (i != index) {
      final.push(arr[i]);
    }
  }
  return final;
};
let displayStr = (container, str) => {
  let display = document.createElement("h3");
  display.innerHTML = str;
  container.appendChild(display);
};
let addButtons = (container, click1, click2) => {
  let div = document.createElement("div");
  let button1 = document.createElement("button");
  let button2 = document.createElement("button");
  button1.innerHTML = "WIN";
  button2.innerHTML = "LOSE";
  div.id = "button_box";
  button1.addEventListener("click", click1);
  button2.addEventListener("click", click2);
  div.appendChild(button1);
  div.appendChild(button2);
  container.appendChild(div);
};
let removeButtons = container => {
  let div = document.getElementById("button_box");
  container.removeChild(div);
};

function start() {
  seed = Number(document.getElementById("seed").value);
  let char1 = document.getElementById("char1").value;
  let char2 = document.getElementById("char2").value;
  let char3 = document.getElementById("char3").value;
  chars = [char1, char2, char3].sort();
  losers = [];
  box.innerHTML = "";

  pick1 = chars.splice(seed % 3, 1)[0];

  displayStr(box, `Pick for game 1: ${pick1}`);
  addButtons(box, win1, lose1);
}

function win1() {
  removeButtons(box);
  pick2 = chars.splice(seed % 2, 1)[0];

  displayStr(box, `Congrats! Pick for game 2: ${pick2}`);
  addButtons(box, win2, lose2);
}

function lose1() {
  removeButtons(box);
  losers.push(pick1);
  pick2 = chars.splice(seed % 2, 1)[0];

  displayStr(box, `Aww, too bad. Pick for game 2: ${pick2}`);
  addButtons(box, win2, lose2);
}

function win2() {
  removeButtons(box);
  pick3 = chars.pop();

  displayStr(box, `Congrats! Pick for game 3: ${pick3}`);
  addButtons(box, win3, lose3);
}
function lose2() {
  removeButtons(box);
  losers.push(pick2);
  pick3 = chars.pop();

  displayStr(box, `Aww, too bad. Pick for game 3: ${pick3}`);
  addButtons(box, win3, lose3);
}

function win3() {
  removeButtons(box);
  if (losers.length == 0) {
    displayStr(box, `You won the match!`);
    return;
  }

  if (seed <= 6) {
    pick4 = losers[0];
  } else {
    pick4 = losers[losers.length - 1];
  }

  displayStr(box, `Congrats! Pick for game 4: ${pick4}`);
  addButtons(box, win4, lose4);
}

function lose3() {
  removeButtons(box);
  losers.push(pick3);
  if (losers.length == 3) {
    displayStr(box, `You lost the match.`);
    return;
  }

  if (seed <= 6) {
    pick4 = losers[0];
  } else {
    pick4 = losers[losers.length - 1];
  }

  displayStr(box, `Aww, too bad. Pick for game 4: ${pick4}`);
  addButtons(box, win4, lose4);
}

function win4() {
  removeButtons(box);
  if (losers.length <= 1) {
    displayStr(box, `You won the match!`);
    return;
  }

  if (seed <= 6) {
    pick5 = losers[losers.length - 1];
  } else {
    pick5 = losers[0];
  }

  displayStr(box, `Congrats! Pick for game 5: ${pick5}`);
  addButtons(box, win5, lose5);
}

function lose4() {
  removeButtons(box);
  if (losers.length == 3) {
    displayStr(box, `You lost the match.`);
    return;
  }

  if (seed <= 6) {
    pick5 = losers[losers.length - 1];
  } else {
    pick5 = losers[0];
  }

  displayStr(box, `Aww, too bad. Pick for game 5: ${pick5}`);
  addButtons(box, win5, lose5);
}

function win5() {
  removeButtons(box);
  displayStr(box, "You won the match!");
}

function lose5() {
  removeButtons(box);
  displayStr(box, "You lost the match.");
}

let randStart = () => {
  let inputBox = document.getElementById("seed");
  inputBox.value = randomInt(12) + 1;
  start();
};

window.addEventListener("load", () => {
  //select the buttons
  let buttonElem = document.querySelector("#go");
  let randomElem = document.querySelector("#random");
  buttonElem.addEventListener("click", start);
  randomElem.addEventListener("click", randStart);
});
