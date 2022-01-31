const board = document.querySelector(".board");
const clearButton = document.querySelector(".clearButton");
const frame = document.querySelector(".frame");
const leftKnob = document.querySelector(".leftKnob");
const rightKnob = document.querySelector(".rightKnob");
//const resizeButton = document.querySelector(".resizeButton");
const random = (n) => Math.floor(Math.random() * n);

// let n = 100;
// currently the board cannot be dynamically resized
//    consider adding 'small' 'medium' 'large' resolution choices
// need to make sure they fit aspect ratio of board (600px * 360px)
let rowCount = 60;
let colCount = 100;
let cursorRow = Math.floor(rowCount / 2);
let cursorCol = Math.floor(colCount / 2);

alert("Use your scrollwheel to draw with left and right knobs!");
populateBoard();

clearButton.addEventListener("click", () => {
  board.childNodes.forEach((square) => {
    square.setAttribute("style", "opacity: 0");
    frame.classList.add("shake");
  });
});

frame.addEventListener("animationend", () => frame.classList.remove("shake"));

/* resizeButton.addEventListener("click", () => {
  while (board.lastChild) board.lastChild.remove();
  n = prompt("Size of (n x n) board (Max 100): ");
  while (n > 100 || n < 1)
    n = prompt("Ivalid! Retry with a number from 1 to 100: ");
  populateBoard();
});*/

function populateBoard() {
  for (let x = 0; x < rowCount * colCount; x++) {
    let square = document.createElement("div");
    square.classList.add("square");
    //square.setAttribute("style", "opacity: 0");
    /*square.addEventListener("mouseenter", () => {
      //square.setAttribute("style", "background-color: black");
      /*square.setAttribute(
        "style",
        `background-color: rgb(${random(256)}, ${random(256)}, ${random(256)})`
      );
      var opacity = Number(square.style.opacity);
      if (opacity < 1) {
        square.setAttribute("style", `opacity: ${opacity + 0.5}`);
      }
    });*/
    board.appendChild(square);
  }
  board.setAttribute("style", `grid-template-columns: repeat(${colCount},1fr)`);
}

// controls x coordinate (i.e. col)
function turnLeftKnob(event) {
  event.preventDefault();
  if (event.deltaY < 0) {
    if (cursorCol < colCount) {
      cursorCol += 1;
      leftKnob.classList.toggle("rotateClockwise");
    }
  } else if (cursorCol > 0) {
    cursorCol -= 1;
    leftKnob.classList.toggle("rotateCounterclockwise");
  }
  drawAtCursor();
}

function turnRightKnob(event) {
  event.preventDefault();
  if (event.deltaY > 0) {
    if (cursorRow < rowCount) {
      cursorRow += 1;
      rightKnob.classList.toggle("rotateClockwise");
    }
  } else if (cursorRow > 0) {
    cursorRow -= 1;
    rightKnob.classList.toggle("rotateCounterclockwise");
  }
  drawAtCursor();
}

leftKnob.onwheel = turnLeftKnob;
rightKnob.onwheel = turnRightKnob;

function drawAtCursor() {
  console.log(`col: ${cursorCol} row: ${cursorRow}`);
  var square = board.childNodes.item(cursorCol + cursorRow * colCount);
  var opacity = Number(square.style.opacity);
  if (opacity < 1) {
    square.setAttribute("style", `opacity: ${opacity + 0.2}`);
  }
}
