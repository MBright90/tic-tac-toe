import {gameMaster} from './utilities/utilities.js'

const hideModal = () => {
    gameMaster.updateScores();
    let modal = document.querySelector('.modal-background');
    modal.style.visibility = 'hidden'

    return hideModal;
};

let confirmButton = document.querySelector('.new-game-button')
confirmButton.addEventListener('click', () => {
    gameMaster.gameBoard.removeBoard();
    gameMaster.gameBoard.clearStats();
    gameMaster.gameBoard.createBoard();
    gameMaster.playGame();
    hideModal();
});

let cancelGameButton = document.querySelector('.cancel-game-button')
cancelGameButton.addEventListener('click', () => {
    hideModal();
});

gameMaster.gameBoard.createBoard();
gameMaster.playGame();