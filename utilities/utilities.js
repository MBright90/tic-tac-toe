// ------------ Game Master --------------- //

const gameMaster = (() => {

    const gameBoard = (() => {

        let _activePlayer = 'O';
        let _computerPlayer = false;
        let _turnLog = [];
        let _gameComplete = false;
        let _finalGameComplete = false;
    
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
            if (choice) {
                let iconSpace = document.querySelectorAll('.player-icon')[1];
                iconSpace.innerHTML = '<i class="fa-solid fa-computer"></i>'
            };
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
                    _finalGameComplete = true;
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

            let completePara = document.querySelectorAll('.end-game-modal>p')[1];
            if (finalState) {
                completePara.textContent = 'Reset Game?';
            } else {
                completePara.textContent = 'Next Round?';
            };

            endGameModal.style.visibility = 'visible';
        }

        const resetGameBoard = () => {
            _activePlayer = 'O';
            _computerPlayer = false;
            _turnLog = [];
            _gameComplete = false;
            _finalGameComplete = false;
            PlayerX.resetPlayer();
            PlayerO.resetPlayer();
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
                gridSpace.dataset.gridNumber = positionIndex + 1;
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
            if (_computerPlayer && _activePlayer === 'O') {
                _computerTurn();
            } else {
                _gridSpaceListeners(document.querySelectorAll('.grid-space'));
            }
        };
    
        const _placeTurn = (e) => {

            _removeSpaceListeners(document.querySelectorAll('.grid-space'));

            e.target.textContent = _activePlayer;
            let turnToLog = {
                turnPosition: e.target.dataset.gridPosition,
                turnPlayer: _activePlayer
            }
            _turnLog.push(turnToLog);
            _endTurn();
        }

        const _computerTurn = () => {

            _removeSpaceListeners(document.querySelectorAll('.grid-space'));

            const _sleep = ms => {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            let randomChoice = Math.floor((Math.random() * 9) + 1)
            let chosenGridSpace = document.querySelector(`[data-grid-number='${randomChoice}']`)

            if (chosenGridSpace.textContent === '') {
                _sleep(1000).then(() => {
                    let turnToLog = {
                        turnPosition: chosenGridSpace.dataset.gridPosition,
                        turnPlayer: _activePlayer
                    }
                    _turnLog.push(turnToLog)
                    chosenGridSpace.textContent = _activePlayer;
                    _endTurn();
                });
            } else {
                _computerTurn();
            };
        };
    
        const _endTurn = () => {

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

            const resetPlayer = () => {
                _winCount = 0;
            }
    
            const addWin = () => {
                _winCount++;
                console.log(`wins: ${_winCount}`)
            }
            const countWins = () => {
                return _winCount;
            }
    
            return {
                addWin: addWin,
                countWins: countWins,
                resetPlayer: resetPlayer
            }
        };
    
        const PlayerX = Player(0);
        const PlayerO = Player(0); 
        const playerArray = [PlayerX, PlayerO];
    
        // ----------- Information functions ----------- //
    
        const clearCurrentStats = () => {
            _gameComplete = false;
            _turnLog = [];
        };
    
        const activePlayer = () => {
            return _activePlayer;
        };

        const isGameComplete = () => {
            return _finalGameComplete;
        }
    
        return {
            createBoard: createBoard,
            removeBoard: removeBoard,
            startNextTurn: startNextTurn,
            clearCurrentStats: clearCurrentStats,
            activePlayer: activePlayer,
            setComputerPlayer: setComputerPlayer,
            isGameComplete: isGameComplete,
            resetGameBoard: resetGameBoard,
            playerArray: playerArray
        };
    
    })();

    const showChoices = () => {
        let choiceBackground = document.querySelector('.choice-background');
        choiceBackground.style.visibility = 'visible';

        let choosePlayer = document.querySelector('.choose-player');
        let chooseComputer = document.querySelector('.choose-computer');

        choosePlayer.addEventListener('click', () => {
            choosePlayer.classList.add('current-choice')
            if (chooseComputer.classList.contains('current-choice')) {
                chooseComputer.classList.remove('current-choice');
            };
        });
   
        chooseComputer.addEventListener('click', () => {
            chooseComputer.classList.add('current-choice')
            if (choosePlayer.classList.contains('current-choice')) {
                choosePlayer.classList.remove('current-choice');
            };
        });

        let confirmChoices = document.querySelector('.choice-confirm-button')
        confirmChoices.addEventListener('click', () => {
            _setUpGame()
            choiceBackground.style.visibility = 'hidden';
        });
    }

    const _setNames = () => {
        let playerNamespaces = document.querySelectorAll('.player-name')

        let playerOneField = document.querySelector('#player-one-name')
        if (playerOneField.value) {
            playerNamespaces[0].textContent = playerOneField.value;
        };

        let playerTwoField = document.querySelector('#player-two-name')
        if (playerTwoField.value) {
            playerNamespaces[1].textContent = playerTwoField.value
        }
    }

    const _setOpposition = () => {
        let choosePlayer = document.querySelector('.choose-player');
        return choosePlayer.classList.contains('current-choice') ? gameBoard.setComputerPlayer(false): 
                                                                   gameBoard.setComputerPlayer(true);   
    };

    const _setUpGame = () => {
        _setNames();
        _setOpposition();
    }

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
        showChoices: showChoices,
    };

})();

export {gameMaster};
