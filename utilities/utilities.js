// ------------ Game Master --------------- //

const gameMaster = (() => {

    const gameBoard = (() => {

        let _activePlayer = 'O';
        let _computerPlayer = false;
        let _turnLog = [];
        let _gameComplete = false;
    
        const gridPositionArr = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3'];
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

        const setComputerPlayer = (choice) => {
            console.log(choice);
            return choice ? _computerPlayer = true : _computerPlayer = false;
        }
    
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

        const _verifyOverallWinner = () => {
            let isVictorious = false
            playerArray.forEach(player => {
                if (player.countWins() >= 3) {
                    isVictorious = true;
                }; 
            });
            return isVictorious;
        };

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
                        victory = true;
                        return _activePlayer === 'X' ? PlayerX.addWin() : PlayerO.addWin();
                };
            })
            return victory;
        };
    
        const _checkGridFull = () => {
            return _turnLog.length >= 9 ? true : false;
        };
    
        const _endGameMessage = (message, finalState) => {
            let endGameModal = document.querySelector('.modal-background');
            let messageSpace = document.querySelector('.end-game-message')
            messageSpace.textContent = message;
            console.log(finalState)
            if (finalState) {
                let completePara = document.querySelectorAll('.end-game-modal>p')[1];
                completePara.textContent = 'First to three';
                let modalButtons = document.querySelectorAll('button');
                console.log(modalButtons)
                modalButtons.forEach(button => {
                    button.remove();
                });
            };
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
            let playerList = document.querySelectorAll('.player-card')
            if (_activePlayer === 'X') {
                _activePlayer = 'O';
                playerList[1].classList.add('is-playing')
                if (playerList[0].classList.contains('is-playing')) {
                    playerList[0].classList.remove('is-playing')
                }
            } else {
                _activePlayer = 'X'
                playerList[0].classList.add('is-playing')
                if (playerList[1].classList.contains('is-playing')) {
                    playerList[1].classList.remove('is-playing')
                }
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
                if (_verifyOverallWinner()) {
                    _endGameMessage(`${_activePlayer} wins!`, true)
                } else {
                _endGameMessage(`${_activePlayer} wins!`, false);
                };
            } else if (_checkGridFull()) {
                _gameComplete = true;
                _endGameMessage('Draw', false);
            } else {
                startNextTurn();
            }
        };
    
        // ----------- Player Objects ------------- //
    
        const Player = () => {
            let _winCount = 0;
    
            const addWin = () => {
                _winCount++;
                console.log(`wins: ${_winCount}`)
            }
            const countWins = () => {
                return _winCount;
            }
    
            return {
                addWin: addWin,
                countWins: countWins
            }
        };
    
        const PlayerX = Player(0);
        const PlayerO = Player(0); 
        const playerArray = [PlayerX, PlayerO];
    
        // ----------- Information functions ----------- //
    
        const clearStats = () => {
            _gameComplete = false;
            _turnLog = [];
        };
    
        const activePlayer = () => {
            return _activePlayer;
        };
    
        return {
            createBoard: createBoard,
            removeBoard: removeBoard,
            startNextTurn: startNextTurn,
            clearStats: clearStats,
            activePlayer: activePlayer,
            setComputerPlayer: setComputerPlayer,
            playerArray: playerArray
        };
    
    })();

    const playGame = () => {
        gameBoard.startNextTurn()
    };

    const _createScore = (score) => {
        let repeatedTicks = '';
        let tick = '✔';
        for (let i = 1; i <= score; i++) {
            repeatedTicks += tick;
        };
        return repeatedTicks;
    };

    const updateScores = () => {
        let playerScores = document.querySelectorAll('.player-score')
        for (let i = 0; i < 2; i++) {
            playerScores[i].textContent = _createScore(gameBoard.playerArray[i].countWins()); 
        };
    };

    const chooseComputerPlayer = () => {

        let choiceBackground = document.querySelector('.choice-background');
        choiceBackground.style.visibility = 'visible';

        let choosePlayer = document.querySelector('.choose-player');
        choosePlayer.addEventListener('click', () => {
            gameBoard.setComputerPlayer(false);
            choiceBackground.style.visibility = 'hidden';
        });

        let chooseComputer = document.querySelector('.choose-computer');
        chooseComputer.addEventListener('click', () => {
            gameBoard.setComputerPlayer(true);
            choiceBackground.style.visibility = 'hidden';
        });
    };

    const gameEnded = () => {
        let playerList = document.querySelectorAll('.player-card');
        playerList.forEach(card => {
            card.classList.remove('is-playing')
        })
    }

    return {
        gameBoard: gameBoard,
        playGame: playGame,
        updateScores: updateScores,
        gameEnded: gameEnded,
        chooseComputerPlayer: chooseComputerPlayer
    };

})();

export {gameMaster};
