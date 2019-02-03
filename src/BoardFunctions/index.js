const _ = require('lodash')
let firstPlayerName = JSON.parse(sessionStorage.getItem("firstPlayerName")) || ''
let secondPlayerName = JSON.parse(sessionStorage.getItem("secondPlayerName")) || ''
let firstPlayerPoints = JSON.parse(sessionStorage.getItem("firstPlayerPoints")) || 0
let secondPlayerPoints = JSON.parse(sessionStorage.getItem("secondPlayerPoints")) || 0
let gameVersusPlayer = JSON.parse(sessionStorage.getItem("gameVersusPlayer")) !== null ? JSON.parse(sessionStorage.getItem("gameVersusPlayer")) : true
let modal = true
let modalSize = true
let _data
let _currentPlayer
let _winner
let _winnerTiles
let _gameEnded
const BOARD_SIZE = 3
export function getModalSize() {
  return modalSize
}
export function setModalSizePlayer() {
  modalSize = true
}
export function setModalSizeComputer() {
  modalSize = false
}
export function setModalVisibilityToFalse() {
  modal = false
}
export function setModalVisibilityToTrue() {
  modal = true
}
export function getModalVisibility() {
  return modal
}
export function changeGameModeToComputer() {
  if(gameVersusPlayer) {
    gameVersusPlayer = false
  }
}

export function changeGameModeToPlayer() {
  if(!gameVersusPlayer) {
    gameVersusPlayer = true
  }
}

export function getMode() {
  return gameVersusPlayer
}
export function getPlayerPoints(whichOne) {
  if(whichOne === 1) {
    return firstPlayerPoints
  }
  else if(whichOne === 2) {
    return secondPlayerPoints
  }
}
export function getPlayerName(whichOne) {
  if(whichOne === 1) {
    return firstPlayerName
  }
  else if(whichOne === 2) {
    return secondPlayerName
  }
}

export function setPlayerName(whichOne, name) {
  if(whichOne === 'first') {
    firstPlayerName = name
    firstPlayerPoints = 0
    sessionStorage.removeItem('firstPlayerPoints')
    reset(1)
  }
  else if(whichOne === 'second') {
    secondPlayerName = name
    secondPlayerPoints = 0
    sessionStorage.removeItem('secondPlayerPoints')
    reset(1)
  }
  else {
    firstPlayerName = name
    secondPlayerName = 'Computer'
    firstPlayerPoints = 0
    secondPlayerPoints = 0
    sessionStorage.removeItem('secondPlayerPoints')
    reset(1)
  }
}

export function addWinnerTiles(tiles) {
  tiles.forEach(function(tile){
    var res = _.find(_winnerTiles, tile);
    if(!_.find(_winnerTiles, tile)){
      _winnerTiles.push(tile);
    }
  })
}


export function isOwned(x, y) {
  return _data[x][y] !== 0;
}

export function setOwner(x, y, ownerId) {
  _data[x][y] = ownerId;
}

export function getOwner(x, y){
  return _data[x][y];
}

export function getCurrentPlayer() {
  return _currentPlayer;
}
export function switchPlayers() {
  _currentPlayer = _currentPlayer === 1 ? 2 : 1;
}

export function sameValueInArray(array) {
  let i = array.length;
  let value = array[0];
  while(i--) {
    if(array[i] !== value) return false;
  }
  return true;
}


export function getWinnerFromLine(line) {
  let winnerInThisLine = line[0] !== 0 && sameValueInArray(line);
  if(winnerInThisLine) return line[0];
  return false;
}


export function updateWinner() {
  if(_winner !== 0) return;

  for(let i = 0; i < BOARD_SIZE; i++){
    let line = [getOwner(i, 0), getOwner(i, 1), getOwner(i, 2)];
    var winnerInLine = getWinnerFromLine(line);
    if(winnerInLine){
      _winner = line[0]
      addWinnerTiles([
        {x: i, y: 0},
        {x: i, y: 1},
        {x: i, y: 2},
      ]);
    };
  }

  for(let i = 0; i < BOARD_SIZE; i++){
    let line = [getOwner(0, i), getOwner(1, i), getOwner(2, i)];
    var winnerInLine = getWinnerFromLine(line);
    if(winnerInLine){
      _winner = line[0];
      addWinnerTiles([
        {x: 0, y: i},
        {x: 1, y: i},
        {x: 2, y: i},
      ]);
    }
  }

  let diag1 = [getOwner(0, 0), getOwner(1, 1), getOwner(2, 2)];
  let winnerInLine1 = getWinnerFromLine(diag1);
  if(winnerInLine1){
    _winner = diag1[0];
    addWinnerTiles([
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 2},
    ]);
  }

  let diag2 = [getOwner(2, 0), getOwner(1, 1), getOwner(0, 2)];
  let winnerInLine2 = getWinnerFromLine(diag2);
  if(winnerInLine2){
    _winner = diag2[0];
    addWinnerTiles([
      {x: 2, y: 0},
      {x: 1, y: 1},
      {x: 0, y: 2},
    ]);
  }
}

export function hasAvailableTiles() {
  for(let x = 0; x < BOARD_SIZE; x++) {
    for(let y = 0; y < BOARD_SIZE; y++) {
      if(_data[x][y] === 0) return true
    }
  }
  return false
}

export function updateGameState() {
  if(_winner !== 0 || !hasAvailableTiles()){
    _gameEnded = true;
    if (_winner === 1) {
      firstPlayerPoints++
    }
    else if (_winner === 2) {
      secondPlayerPoints++
    }
  }
}

export function reset(newgame) {
  if(newgame) {
    sessionStorage.removeItem("_data")
    sessionStorage.removeItem("_currentPlayer")
    sessionStorage.removeItem("_gameEnded")
    sessionStorage.removeItem("_winner")
    sessionStorage.removeItem("_winnerTiles")
    _currentPlayer = 1;
  _data          = [];
  _gameEnded     = false;
  _winner        = 0;
  _winnerTiles   = [];
  for(let x = 0; x < BOARD_SIZE; x++) {
    _data[x] = [];
    for(let y = 0; y < BOARD_SIZE; y++) {
      _data[x][y] = 0;
    }
  }
  }
  else {
    _currentPlayer = JSON.parse(sessionStorage.getItem("_currentPlayer")) || 1
    const arr =  JSON.parse(sessionStorage.getItem("_data"))
    _data = arr ? arr.slice() : []
    _gameEnded = JSON.parse(sessionStorage.getItem("_gameEnded")) || false
    _winner =  JSON.parse(sessionStorage.getItem("_winner")) || 0
    const arr2 = JSON.parse(sessionStorage.getItem("_winnerTiles"))
    _winnerTiles = arr2 ? arr2.slice() : [];
    if(!arr) {
    for(let x = 0; x < BOARD_SIZE; x++) {
      _data[x] = [];
      for(let y = 0; y < BOARD_SIZE; y++) {
        _data[x][y] = 0;
      }
    }
    }
  }
}
reset(0)


export function getTiles() {
    return _data;
}

export function getWinnerTiles() {
    return _winnerTiles;
}

export function isWinnerTile(x, y) {
    return !!_.find(_winnerTiles, {x: x, y: y});
}


export function getSize() {
    return BOARD_SIZE;
}


export function getWinner() {
    return _winner
}


export function gameEnded() {
    return _gameEnded;
}

export function isDrawGame() {
    return gameEnded() && getWinner() === 0;
}

function saveLocalStorage() {
  sessionStorage.setItem("firstPlayerName", JSON.stringify(firstPlayerName))
  sessionStorage.setItem("secondPlayerName", JSON.stringify(secondPlayerName))
  sessionStorage.setItem("_data", JSON.stringify(_data))
  sessionStorage.setItem("_currentPlayer", JSON.stringify(_currentPlayer))
  sessionStorage.setItem("_gameEnded", JSON.stringify(_gameEnded))
  sessionStorage.setItem("_winner", JSON.stringify(_winner))
  sessionStorage.setItem("_winnerTiles", JSON.stringify(_winnerTiles))
  sessionStorage.setItem("firstPlayerPoints", JSON.stringify(firstPlayerPoints))
  sessionStorage.setItem("secondPlayerPoints", JSON.stringify(secondPlayerPoints))
  sessionStorage.setItem("gameVersusPlayer", JSON.stringify(gameVersusPlayer))
}

export function onClickTile(x, y) {
  if(gameEnded()) return
        if(x >= getSize() || x < 0) return
        if(y >= getSize() || y < 0) return
        if(isOwned(x, y)) return
        setOwner(x, y, getCurrentPlayer())
        var X, Y
        if(!gameVersusPlayer) {
          while(true) {
            X = Math.floor(Math.random() * 3)
            Y = Math.floor(Math.random() * 3)
            if(getOwner(X, Y) === 0 || !hasAvailableTiles()) {
              break
            } 
          }
        }
        if(gameVersusPlayer) {
          switchPlayers()
        }
        updateWinner()
        if(_winner === 0 && !gameVersusPlayer) {
          setOwner(X, Y, 2)
        }
        updateWinner()
        updateGameState()
        saveLocalStorage()
}

