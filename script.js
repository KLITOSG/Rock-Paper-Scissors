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

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

$(document).ready(function () {
  updateScoreElement();

  $(".move-btn").on("click", function () {
    playGame($(this).data("move"));
  });

  $("#reset-score").on("click", function () {
    score = {
      wins: 0,
      losses: 0,
      ties: 0,
    };

    localStorage.removeItem("score");
    updateScoreElement();
    $(".result").text("Score reset.");
    $(".moves").text("");
  });
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
  $(".board").text(`Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);
}

function showRound(playerMove, computerMove, result) {
  $(".result").text(result);
  $(".moves").html(`
    You
    <img src="${getMoveIcon(playerMove)}" alt="${moveNames[playerMove]}" class="move-icon">
    <img src="${getMoveIcon(computerMove)}" alt="${moveNames[computerMove]}" class="move-icon">
    Computer
  `);
}

function getMoveIcon(move) {
  return `images/${move}-emoji.png`;
}

function pickComputerMove() {
  const randomIndex = Math.floor(Math.random() * moves.length);

  return moves[randomIndex];
}
