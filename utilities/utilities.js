const gameBoard = (() => {

    const _createGridSpaces = () => {
        const gridPositionArr = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3'];
        let gridArr = [];
        for (let positionIndex = 0; positionIndex < 9; positionIndex++) {
            console.log(positionIndex)
            const gridSpace = document.createElement('div');
            gridSpace.classList.add('grid-space');
            gridSpace.dataset.gridPosition = gridPositionArr[positionIndex];
            gridArr.push(gridSpace);
        }
        _gridSpaceListeners(gridArr);
        return gridArr;
    }

    const _gridSpaceListeners = (nodeList) => {
        nodeList.forEach(space => {
            space.addEventListener('click', () => {
                space.textContent = gameMaster.activePlayer();
                gameMaster.nextTurn();
            });
        });
    };

    const createBoard = () => {
        if (!!document) {
            const gameArea = document.querySelector('.board-container');
            const gameBoard = document.createElement('div')
            gameBoard.classList.add('game-board');

            const gridArray = _createGridSpaces();
            gridArray.forEach(gridSpace => {
                gameBoard.appendChild(gridSpace)
                console.log(gameBoard);
            });

            gameArea.appendChild(gameBoard);
        }
    }

    const removeBoard = () => {
        if (!!document) {
            const gameBoard = document.querySelector('.game-board');
            gameBoard.remove();
        }
    }

    return{
        createBoard,
        removeBoard,
    }

})();

const gameMaster = (() => {
    let _activePlayer = 'X';

    const activePlayer = () => {
        return _activePlayer;
    };

    const nextTurn = () => {
        if (_activePlayer === 'X') {
            _activePlayer = 'O';
        } else {
            _activePlayer = 'X'
        };
    };

    return {
        activePlayer: activePlayer,
        nextTurn: nextTurn,
    };

})();

const player = (marker, playerNumber, activePlayer) => {
    this._turnNumber = 0;
    this._winsNumber = 0;
    this._activePlayer = activePlayer;

    const numberOfTurns = () => {
        return _turnNumber;
    };

    const numberOfWins = () => {
        return _winsNumber
    };

    return{
        marker: marker, 
        playerNumber: playerNumber,
        numberOfTurns: numberOfTurns,
        numberOfWins: numberOfWins,
    }

};

export {gameBoard, gameMaster, player}
