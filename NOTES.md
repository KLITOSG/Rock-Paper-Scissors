# Rock Paper Scissors Notes

## index.html

- Holds the visible page structure.
- Adds the Rock, Paper, and Scissors image buttons.
- Adds the result, moves, score board, and Reset Score button.
- Loads `style.css` for styling and `script.js` for game behavior.

## style.css

- Creates the dark centered game layout.
- Styles the large title, round move buttons, move icons, result text, score text, and reset button.
- Adds hover/focus states and responsive sizing for smaller screens.

## script.js

- Stores the game moves and winning move combinations.
- Uses `pickComputerMove()` so the computer chooses randomly.
- Uses `playGame(playerMove)` to run each round.
- Uses `localStorage` so wins, losses, and ties stay saved after refreshing the page.
- Uses `updateScoreElement()` and `showRound()` to update the page without `alert()` popups.
- Resets the score when the Reset Score button is clicked.
