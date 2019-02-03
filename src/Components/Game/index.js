import React from 'react'
import BoardHeader from '../../Components/BoardHeader/index.js'
import Tile from '../../Components/Tile/index.js'
import TileRow from '../../Components/TileRow/index.js'
import tinycolor from 'tinycolor2'
import tileColors from '../../Constans/TileColors'
import styled from 'styled-components'
import { setModalVisibilityToFalse, getSize, getTiles, gameEnded, isWinnerTile, getWinner, getCurrentPlayer, getMode } from '../../BoardFunctions/index.js'
import PointsLabel from '../PointsLabel/index.js'
import Fullscreen from "react-full-screen"
import SetFullMode from '../../Components/SetFullMode/index.js'
import Beforeunload from 'react-beforeunload'

const StyledGameContainer = styled.div`
  width: 192px;
  top: 15%;
  margin: 0 auto;
  position: relative;
`

const StyledGame = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 100%;
  transition: 0.5s all;
  padding: 60px 0 20px 0;
  background:  ${props => props.player1 ? tinycolor(tileColors[1]).setAlpha(0.2).toString() : props => props.player2 ?  tinycolor(tileColors[2]).setAlpha(0.2).toString() : null};
`

const StyledBoard = styled.div`
  transition: 0.5s all;
  transform: scaleY(1) rotateZ(0);
  transform: ${props => props.endGame ? 'scaleY(0.5) rotateZ(-45deg)' : 'scaleY(1) rotateZ(0)'};
`

class Game extends React.Component {
  constructor(props) {
    super();
 
    this.state = {
      isFull: false,
    }
  }
  update = () => {
    this.forceUpdate()
}
goFull = () => {
  this.setState({ isFull: true });
}
  render() {
    let children = []
    let boardSize = getSize()
    let tiles = getTiles()
    for(let x = 0; x < boardSize; x++) {
      let rowChildren = [];
      for(let y = 0; y < boardSize; y++) {
        rowChildren.push(<Tile click={this.update} x={x} y={y} owner={tiles[x][y]} isWinnerTile={isWinnerTile(x, y)}></Tile>);
      }
      children[x] = <TileRow>{rowChildren}</TileRow>;
    }
    let highlightPlayer;
    if(gameEnded()){
      highlightPlayer = getWinner();
    }else{
      highlightPlayer = getCurrentPlayer();
    }
    return (
      <React.Fragment>
        <Beforeunload onBeforeunload={setModalVisibilityToFalse()}>
      <Fullscreen
        enabled={this.state.isFull}
        onChange={isFull => this.setState({isFull})}>
      <StyledGame
        player1={highlightPlayer === 1}
        player2={highlightPlayer === 2 && getMode()}
      >
        <StyledGameContainer>
          <BoardHeader click={this.update} />
          <StyledBoard
            endGame={gameEnded()}
          >
            {children}
        </StyledBoard>
        </StyledGameContainer>
        <PointsLabel whichOne={1}/>
        <PointsLabel whichOne={2}/>
      </StyledGame>
      </Fullscreen>
      </Beforeunload>
      <SetFullMode goFull={this.goFull} />
      </React.Fragment>
    )
  }

}
export default Game