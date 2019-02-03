import React from 'react'
import tinycolor from 'tinycolor2'
import tileColors from '../../Constans/TileColors.js'
import defaultProps from 'prop-types'
import styled, { keyframes} from 'styled-components'
import { getCurrentPlayer, gameEnded, onClickTile } from '../../BoardFunctions/index.js'


const winnerTileAnimation = keyframes`
  from {
    transform: rotate(0deg);
    filter: brightness(50%);
  }

  to {
    transform: rotate(360deg);
    filter: brightness(100%);
  }
`
const StyledTile = styled.div`
  width: 62px;
  height: 62px;
  display: inline-block;
  line-height: 62px;
  text-align: center;
  font-size: 48px;
  float: left;
  cursor: ${props => props.blocked ? 'not-allowed' : 'pointer'};
  transition: 0.3s all;
  background: ${props => props.ownedByPlayer1 ? tileColors[1] : props => props.ownedByPlayer2 ? tileColors[2] : 'white'};
  margin: 1px;
  animation-name: ${props => props.winnerTile ? winnerTileAnimation : null};
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  &:hover {
    background: ${props => props.currentPlayer1 ? tinycolor(tileColors[1]).brighten(10).toString() :
      props => props.currentPlayer2 ? tinycolor(tileColors[2]).brighten(10).toString() :
      props => props.ownedByPlayer1 ? tinycolor(tileColors[1]).brighten(10).toString() :
      props => props.ownedByPlayer2 ? tinycolor(tileColors[2]).brighten(10).toString() : null};
  }





`


var playerToken = {
  0: '',
  1: 'x',
  2: 'o'
}



class Tile extends React.Component {
  onTileHit = () => {
    const {x, y, click} = this.props
    onClickTile(x, y)
    click()
  }

  render() {
    let { owner } = this.props
    let blocked = owner !== 0 || gameEnded()
    return (
      <StyledTile 
      ownedByPlayer1={owner === 1}
      ownedByPlayer2={owner === 2}
      blocked={blocked}
      currentPlayer1={!blocked && getCurrentPlayer() === 1}
      currentPlayer2={!blocked && getCurrentPlayer() === 2}
      winnerTile={this.props.isWinnerTile}
      onClick={this.onTileHit}
      >
        {playerToken[owner]}
      </StyledTile>
    )
  }

}


 Tile.defaultProps = {
    x            : 0,
    y            : 0,
    owner        : 0,
    isWinnerTile : false,
 }

export default Tile