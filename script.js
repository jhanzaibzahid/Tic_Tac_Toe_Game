
const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statustext");
const restartBtn = document.querySelector("#restartbtn");
const wincondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

initializeGame();

function initializeGame() {
  cell.forEach(cell => cell.addEventListener("click", cellclicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
}

function cellclicked() {
  const cellIndex = this.getAttribute("cellindex");

  if (options[cellIndex] !== "" || !running) {
    return;
  }
  updatecell(this, cellIndex);
  checkWinner();
}

function updatecell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changeplayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < wincondition.length; i++) {
    const condition = wincondition[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changeplayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cell.forEach(cell => (cell.textContent = ""));
  running = true;
}
