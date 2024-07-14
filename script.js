let boxes = document.querySelectorAll(".but");
let msgcont = document.querySelector(".msg");
let message = document.querySelector(".win");
let gameMode = null;
let userTurn = true;
let winnerFound = false;
let turn0 = true;
let firstUserMove = null;
let botFirstMove = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const getRandomMove = () => {
  const availableBoxes = Array.from(boxes).filter((box) => !box.innerText);
  return availableBoxes.length
    ? availableBoxes[Math.floor(Math.random() * availableBoxes.length)]
    : null;
};

const getDifficultMove = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
    const countX = values.filter((val) => val === "X").length;
    const countO = values.filter((val) => val === "0").length;

    if (countX === 2 || countO === 2) {
      const emptyIndex = values.findIndex((val) => val === "");
      if (emptyIndex !== -1) {
        return boxes[pattern[emptyIndex]];
      }
    }
  }

  if (firstUserMove === 4) {
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
      if (!boxes[corner].innerText) {
        return boxes[corner];
      }
    }
  }

  return getRandomMove();
};

const getExpertMove = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
    const countX = values.filter((val) => val === "X").length;
    const countO = values.filter((val) => val === "0").length;

    if (countX === 2 || countO === 2) {
      const emptyIndex = values.findIndex((val) => val === "");
      if (emptyIndex !== -1) {
        return boxes[pattern[emptyIndex]];
      }
    }
  }

  if (botFirstMove && firstUserMove !== 4) {
    botFirstMove = false;
    return boxes[4];
  }

  if (firstUserMove === 4) {
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
      if (!boxes[corner].innerText) {
        return boxes[corner];
      }
    }
  }

  return getRandomMove();
};

const botMove = () => {
  let move = null;

  if (gameMode === "easy-bot") {
    move = getRandomMove();
  } else if (gameMode === "difficult-bot") {
    move = getDifficultMove();
  } else if (gameMode === "expert-bot") {
    move = getExpertMove();
  }

  if (move) {
    move.innerText = turn0 ? "0" : "X";
    move.disabled = true;
    turn0 = !turn0;
    checkWinner();
    draw();
    userTurn = true; 
    enableBoxes();
  }
};

const handleBoxClick = (but) => {
  if (but.disabled || winnerFound || !userTurn) return;

  but.innerText = turn0 ? "0" : "X";
  but.disabled = true;
  turn0 = !turn0;
  if (firstUserMove === null) {
    firstUserMove = Array.from(boxes).indexOf(but);
  }
  checkWinner();
  draw();

  if (
    !winnerFound &&
    (gameMode === "easy-bot" ||
      gameMode === "difficult-bot" ||
      gameMode === "expert-bot")
  ) {
    userTurn = false; 
    setTimeout(botMove, 500);
  }
};

boxes.forEach((but) => {
  but.addEventListener("click", () => handleBoxClick(but));
});

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
    box.style.cursor = "not-allowed";
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    if (!box.innerText) {
      box.disabled = false;
      box.style.cursor = "pointer";
    }
  });
};

const showWin = (winner) => {
  winnerFound = true;
  message.innerText = `CONGRATULATIONS, WINNER IS ${winner}`;
  msgcont.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  message.innerText = `OH, IT'S A DRAW`;
  msgcont.classList.remove("hide");
};

const draw = () => {
  const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (allBoxesFilled && !winnerFound) {
    showDraw();
  }
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [pos1, pos2, pos3] = pattern;
    const pos1Val = boxes[pos1].innerText;
    const pos2Val = boxes[pos2].innerText;
    const pos3Val = boxes[pos3].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWin(pos1Val);
      }
    }
  }
};

const resetGame = () => {
  turn0 = true;
  winnerFound = false;
  userTurn = true;
  firstUserMove = null;
  botFirstMove = true;
  enableBoxes();
  msgcont.classList.add("hide");
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.cursor = "pointer";
  });
};

document.querySelectorAll(".mode").forEach((button) => {
  button.addEventListener("click", (event) => {
    gameMode = event.target.dataset.mode;
    resetGame();
  });
});
