const board = document.querySelector(".board");
const clearButton = document.querySelector(".clearButton");
const resizeButton = document.querySelector(".resizeButton");
const random = (n) => Math.floor(Math.random() * n);

let n = 50;
populateBoard();

clearButton.addEventListener("click", () => {
  board.childNodes.forEach((square) =>
    square.setAttribute("style", "background-color: white")
  );
});

resizeButton.addEventListener("click", () => {
  while (board.lastChild) board.lastChild.remove();
  n = prompt("Size of (n x n) board (Max 100): ");
  while (n > 100 || n < 1)
    n = prompt("Ivalid! Retry with a number from 1 to 100: ");
  populateBoard();
});

function populateBoard() {
  for (let x = 0; x < n ** 2; x++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("style", "opacity: 0");
    square.addEventListener("mouseenter", () => {
      //square.setAttribute("style", "background-color: black");
      /*square.setAttribute(
        "style",
        `background-color: rgb(${random(256)}, ${random(256)}, ${random(256)})`
      );*/
      var opacity = Number(square.style.opacity);
      if (opacity < 1) {
        square.setAttribute("style", `opacity: ${opacity + 0.1}`);
      }
    });
    board.appendChild(square);
  }
  board.setAttribute("style", `grid-template-columns: repeat(${n},1fr)`);
}
