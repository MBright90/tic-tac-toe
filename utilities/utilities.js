const gameBoard = (() => {

    let _activePlayer = 'O';
    let _turnLog = [];
    let _gameComplete = false;

    const _victoryConditions = [
    ['1-1', '1-2', '1-3'],
    ['2-1', '2-2', '2-3'],
    ['3-1', '3-2', '3-3'],
    ['1-1', '2-1', '3-1'],
    ['1-2', '2-2', '3-2'],
    ['1-3', '2-3', '3-3'],
    ['1-1', '2-2', '3-3'],
    ['1-3', '2-2', '3-1'] 
    ];

    const _gridSpaceListeners = (nodeList) => {
        nodeList.forEach(space => {
            if (space.textContent === '') {
                space.addEventListener('click', _placeTurn)
            }
        });
    };

    const _removeSpaceListeners = (nodeList) => {
        nodeList.forEach(space => {
            space.removeEventListener('click', _placeTurn)
        });
    };

    // ---------- Game end functions ---------- //
    const _checkVictoryStatus = () => {

        let victory = false;

        let filteredPlayer = _turnLog.filter((turn) => {
            return turn.turnPlayer === _activePlayer ? turn.turnPosition : false;
        });

        let filteredTurns = filteredPlayer.map(log => log.turnPosition)

        _victoryConditions.forEach(condition => {
            if (filteredTurns.includes(condition[0]) &&
                filteredTurns.includes(condition[1]) &&
                filteredTurns.includes(condition[2])) {
                    console.log('We have a winner')
                    victory = true;
            };
        })
        return victory;
    };

    const _checkGridFull = () => {
        return _turnLog.length >= 9 ? true : false;
    };

    const _endGameMessage = (message) => {
        let endGameModal = document.querySelector('.modal-background');
        let messageSpace = document.querySelector('.end-game-message')
        messageSpace.textContent = message;
        endGameModal.style.visibility = 'visible';
    }

    // ---------- Board functions ---------- //
    const createBoard = () => {
        if (!!document) {
            const gameArea = document.querySelector('.board-container');
            const gameBoard = document.createElement('div')
            gameBoard.classList.add('game-board');

            const gridArray = _createGridSpaces();
            gridArray.forEach(gridSpace => {
                gameBoard.appendChild(gridSpace)
            });

            gameArea.appendChild(gameBoard);
        }
    };

    const _createGridSpaces = () => {
        const gridPositionArr = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3'];
        let gridArr = [];
        for (let positionIndex = 0; positionIndex < 9; positionIndex++) {
            const gridSpace = document.createElement('div');
            gridSpace.classList.add('grid-space');
            gridSpace.dataset.gridPosition = gridPositionArr[positionIndex];
            gridArr.push(gridSpace);
        };
        return gridArr;
    };

    const removeBoard = () => {
        if (!!document) {
            const gameBoard = document.querySelector('.game-board');
            gameBoard.remove();
        }
    };

    // ---------- Turn functions ---------- //

    const startNextTurn = () => {
        if (_activePlayer === 'X') {
            _activePlayer = 'O';
        } else {
            _activePlayer = 'X'
        };
        _gridSpaceListeners(document.querySelectorAll('.grid-space'));
    };

    const _placeTurn = (e) => {
        e.target.textContent = _activePlayer;
        let turnToLog = {
            turnPosition: e.target.dataset.gridPosition,
            turnPlayer: _activePlayer
        }
        _turnLog.push(turnToLog);
        _endTurn();
    }

    const _endTurn = () => {
        _removeSpaceListeners(document.querySelectorAll('.grid-space'));
        if (_checkVictoryStatus()) {
            _gameComplete = true;
            _endGameMessage(`${_activePlayer} wins!`);
        } else if (_checkGridFull()) {
            _gameComplete = true;
            _endGameMessage('draw');
        } else {
            startNextTurn();
        }
    };

    // const _setNextTurn = () => {
    //     if (_activePlayer === 'X') {
    //         _activePlayer = 'O';
    //     } else {
    //         _activePlayer = 'X'
    //     };
    //     startNextTurn();
    // };

    // ----------- Information functions ----------- //

    const clearStats = () => {
        _gameComplete = false;
        _turnLog = [];
    };

    return {
        createBoard: createBoard,
        removeBoard: removeBoard,
        startNextTurn: startNextTurn,
        clearStats: clearStats
    };

})();

const gameMaster = (() => {

    const playGame = () => {
        gameBoard.startNextTurn()
    };

    return {
        playGame: playGame,
    };

})();

export {gameBoard, gameMaster};
