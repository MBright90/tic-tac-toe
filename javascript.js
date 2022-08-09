import {gameBoard, gameMaster} from './utilities/utilities.js'

const hideModal = () => {
    let modal = document.querySelector('.modal-background');
    modal.style.visibility = 'hidden'

    return hideModal;
};

let confirmButton = document.querySelector('.new-game-button')
confirmButton.addEventListener('click', () => {
    gameBoard.removeBoard();
    gameBoard.clearStats();
    gameBoard.createBoard();
    gameMaster.playGame();
    hideModal();
});

let cancelGameButton = document.querySelector('.cancel-game-button')
cancelGameButton.addEventListener('click', () => {
    hideModal();
});

gameBoard.createBoard();
gameMaster.playGame();