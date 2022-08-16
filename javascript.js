import {gameMaster, menuMaster} from './utilities/utilities.js'

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

let difficultyModal = document.querySelector('.about-modal-background');
let showDifficultyModal = document.querySelector('.help-icon');
showDifficultyModal.addEventListener('click', () => {
    difficultyModal.style.visibility = 'visible';
})

let closeDifficulty = document.querySelector('.about-modal > a');
closeDifficulty.addEventListener('click', () => {
    difficultyModal.style.visibility = 'hidden';
});

// Game initiation

menuMaster.setMenuListeners();

gameMaster.gameBoard.createBoard();
gameMaster.showChoices();
