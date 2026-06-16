const moves = ["rock", "paper", "scissors"];
const moveNames = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};
const winningMoves = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const resultElement = document.querySelector(".result");
const movesElement = document.querySelector(".moves");
const scoreElement = document.querySelector(".board");
const resetButton = document.getElementById("reset-score");

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

document.querySelectorAll(".move-btn").forEach((button) => {
  button.addEventListener("click", () => {
    playGame(button.dataset.move);
  });
});

resetButton.addEventListener("click", () => {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  localStorage.removeItem("score");
  updateScoreElement();
  resultElement.textContent = "Score reset.";
  movesElement.textContent = "";
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  const result = getResult(playerMove, computerMove);

  updateScore(result);
  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();
  showRound(playerMove, computerMove, result);
}

function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "Tie.";
  }

  if (winningMoves[playerMove] === computerMove) {
    return "You Win.";
  }

  return "You Lose.";
}

function updateScore(result) {
  if (result === "You Win.") {
    score.wins += 1;
  } else if (result === "You Lose.") {
    score.losses += 1;
  } else {
    score.ties += 1;
  }
}

function updateScoreElement() {
  scoreElement.textContent = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function showRound(playerMove, computerMove, result) {
  resultElement.textContent = result;
  movesElement.innerHTML = `
    You
    <img src="${getMoveIcon(playerMove)}" alt="${moveNames[playerMove]}" class="move-icon">
    <img src="${getMoveIcon(computerMove)}" alt="${moveNames[computerMove]}" class="move-icon">
    Computer
  `;
}

function getMoveIcon(move) {
  return `images/${move}-emoji.png`;
}

function pickComputerMove() {
  const randomIndex = Math.floor(Math.random() * moves.length);

  return moves[randomIndex];
}
