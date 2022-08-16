import {gameMaster} from './utilities/utilities.js'

const hideModal = () => {
    gameMaster.updateScores();
    let modal = document.querySelector('.end-modal-background');
    modal.style.visibility = 'hidden'

    return hideModal;
};

let confirmButton = document.querySelector('.new-game-button')
confirmButton.addEventListener('click', () => {
    if (gameMaster.gameBoard.isGameComplete()) {
        gameMaster.gameBoard.resetGameBoard();
        gameMaster.showChoices();
    };
    gameMaster.gameBoard.removeBoard();
    gameMaster.gameBoard.clearCurrentStats();
    gameMaster.gameBoard.createBoard();
    gameMaster.playGame();
    hideModal();}
);

let cancelGameButton = document.querySelector('.cancel-game-button')
cancelGameButton.addEventListener('click', () => {
    gameMaster.gameEnded();
    hideModal();
});


gameMaster.gameBoard.createBoard();
// gameMaster.showChoices();
gameMaster.playGame();