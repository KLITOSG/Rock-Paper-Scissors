let score = JSON.parse(localStorage.getItem('score')) || {
wins:0,
losses:0,
ties:0
};


 
updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying) {
     
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)

    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result ='';

  if (playerMove === 'Rock'){
    if (computerMove === 'Rock'){
       result = 'Tie.';
     }
    else if (computerMove === 'Paper'){
      result = 'You Lose.';
    }
    else {
       result = 'You Win.';

    }
  }

  else if(playerMove ==='Paper'){
    if(computerMove === 'Rock'){
      result = 'You Win.';
    }
  else if (computerMove === 'Paper'){
       result = 'Tie.';
    }
   else {
    result = 'You Lose.';
    }
  }
  
  else if (playerMove ==='Scissors'){
    if(computerMove === 'Rock'){
      result = 'You Lose.';
    }
    else if (computerMove === 'Paper'){
      result = 'You Win.';
    }
    else {
      result = 'Tie.';
    }
  }
    
  
  if (result === 'You Win.') {
    score.wins += 1;
    
  }

  else if(result === 'You Lose.') {
    score.losses += 1;      
  }

 else if(result === 'Tie.') {
    score.ties +=1
  }

  

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
   
  document.querySelector('.result')
   .innerHTML = result;

  document.querySelector('.moves')
    .innerHTML = `  
      You  
      <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon">
    
      <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon">
      Computer`;
    
};
 
function updateResult() {
   document.querySelector('.result')
   .innerHTML = result;
};

function updateScoreElement() {
  document.querySelector('.board')
    .innerText = ` Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties} `;
};

function pickComputerMove(){

  const randomNumber = Math.random();
  let computerMove = '';
 

 if(randomNumber >= 0 && randomNumber < 1/3){
   computerMove = 'Rock';
 
  } 
  else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  }
  else {
    computerMove = 'Scissors' ;
  };

  return computerMove;
  

}
