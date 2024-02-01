let boxes = document.querySelectorAll(".but");
let reset = document.querySelector(".reset");
let turn0 = true;
let msgcont = document.querySelector(".msg");
let message = document.querySelector(".win");
let winnerFound = false;

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

boxes.forEach((but) => {
  but.addEventListener("click", () => {
    if (but.disabled || winnerFound) {
      return;
    }

    if (turn0) {
      but.innerText = "0";
      turn0 = false;
    } else {
      but.innerText = "X";
      turn0 = true;
    }
    but.disabled = true;
    checkWinner();
    draw();
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
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
  enableBoxes();
  msgcont.classList.add("hide");
};

reset.addEventListener("click", resetGame);
