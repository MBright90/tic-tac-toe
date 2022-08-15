const computerBrain = (() => {
    let _difficultyPercent = 100;
    let _aiMarker = 'O';
    let _playerMarker = 'X';

    const changeDifficulty = (percent) => {
        _difficultyPercent = percent;
    };

    // Choosing whether to play best possible move or random move depending on the difficulty percent

    const chooseMove = () => {

        let randomValue = Math.floor((Math.random() * 100) + 1);
        let computerMoveNum;

        if (randomValue < _difficultyPercent) {
            computerMoveNum = _minimax(_currentBoardState(), _aiMarker).index;
        }
        else {
            computerMoveNum = Math.floor((Math.random() * 9) + 1)
        }
        return computerMoveNum;
        
    }

    const _currentBoardState = () => {

        // Check which fields are empty, player filled or computer filled

        let fullGridArray = Array.from(document.querySelectorAll('.grid-space'));

        let currentBoardState = [];
        for (let i = 0; i < fullGridArray.length; i++) {
            if (fullGridArray[i].textContent === '') {
                currentBoardState.push(fullGridArray[i].dataset.gridNumber - 1);
            } else {
                currentBoardState.push(fullGridArray[i].textContent);
            };
        };

        return currentBoardState;
    };

    const _retrieveEmptyIndexes = (boardState) => {

        // Returning the possible positions for the current iteration of the minimax loop to place markers

        return boardState.filter(space => {
            return space === 'X' || space === 'O' ? false : true; 
        });
    };

    const _checkForWinningMove = (boardState, playerMark) => {

        /* Determining whether when iterating through the recursive minimax loop, the current loop has found an
        end game state */

        if (
            boardState[0] === playerMark && boardState[1] === playerMark && boardState[2] === playerMark ||
            boardState[3] === playerMark && boardState[4] === playerMark && boardState[5] === playerMark ||
            boardState[6] === playerMark && boardState[7] === playerMark && boardState[8] === playerMark ||
            boardState[0] === playerMark && boardState[3] === playerMark && boardState[6] === playerMark ||
            boardState[1] === playerMark && boardState[4] === playerMark && boardState[7] === playerMark ||
            boardState[2] === playerMark && boardState[5] === playerMark && boardState[8] === playerMark ||
            boardState[0] === playerMark && boardState[4] === playerMark && boardState[8] === playerMark ||
            boardState[2] === playerMark && boardState[4] === playerMark && boardState[6] === playerMark
        ) {
            return true;
        } else {
            return false;
        }
    };

    const _findBestMove = (player, testArray) => {

        // Iterating through the available test information to find the best current moves

        let currentBestMove;

        if (player === _aiMarker) {
            let bestScore = Infinity;
            for (let i = 0; i < testArray.length; i++) {
                if (testArray[i].score < bestScore) {
                    bestScore = testArray[i].score;
                    currentBestMove = i;
                };
            };

        } else {
            let bestScore = -Infinity;
            for (let i = 0; i < testArray.length; i++) {
                if (testArray[i].score > bestScore) {
                    bestScore = testArray[i].score;
                    currentBestMove = i;
                };
            };
        };

        return currentBestMove;
    
    };

    const _minimax = (boardState, currentPlayer) => {

        let emptyCells = _retrieveEmptyIndexes(boardState);

        // Checking for end game states and breaking the recursive loop

        if (_checkForWinningMove(boardState, _aiMarker)) {
            return {score: 100};
        } else if (_checkForWinningMove(boardState, _playerMarker)) {
            return {score: -100};
        } else if (emptyCells.length === 0) {
            return {score: 0};
        };

        // If not at an end game state:

        const allTests = [];

        // Loop through the empty cells and test all possibilities

        for (let i = 0; i < emptyCells.length; i++) {

            const currentMove = {};
            currentMove.index = boardState[emptyCells[i]];

            boardState[currentMove.index] = currentPlayer;

            if (currentPlayer === _aiMarker) {

                let result = _minimax(boardState, _playerMarker);
                currentMove.score = result.score; 

            } else if (currentPlayer === _playerMarker) {

                let result = _minimax(boardState, _aiMarker);
                currentMove.score = result.score;
            }

            boardState[currentMove.index] = emptyCells[i]
            allTests.push(currentMove);
        }

        let bestMove = _findBestMove(currentPlayer, allTests);

        return allTests[bestMove];
    }

    return {
        changeDifficulty,
        chooseMove,
    }

})();

export {computerBrain};
