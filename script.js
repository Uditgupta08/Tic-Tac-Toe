let boxes = document.querySelectorAll(".but");
let reset = document.querySelector(".reset");
let turn0 = true;
let msgcont = document.querySelector(".msg");
let message = document.querySelector(".win");
let winnerFound = false;
const winPatters = [
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
const disablebox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enablebox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWin = (winner) => {
  winnerFound = true;
  message.innerText = `CONGRATULATIONS , WINNER IS ${winner}`;
  msgcont.classList.remove("hide");
  disablebox();
};
const showdraw = () => {
  message.innerText = `OH , IT'S A DRAW`;
  msgcont.classList.remove("hide");
};
const draw = () => {
  const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (allBoxesFilled && !winnerFound) {
    showdraw();
  }
};
const checkWinner = () => {
  for (pattern of winPatters) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        showWin(pos1Val);
      }
    }
  }
};
const resetg = () => {
  turn0 = true;
  winnerFound = false;
  enablebox();
  msgcont.classList.add("hide");
};
reset.addEventListener("click", resetg);
