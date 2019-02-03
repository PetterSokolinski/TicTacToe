import React from 'react'
import tinycolor from 'tinycolor2'
import tileColors from '../../Constans/TileColors'
import styled from 'styled-components'
import { isDrawGame, gameEnded, getWinner, getCurrentPlayer, reset, getPlayerName } from '../../BoardFunctions/index.js'


const StyledHeaderContainer = styled.div`
    width: 190px;
    height: 62px;
    margin: 1px;
    color: white;
    padding: 0 10px;
    cursor: pointer;
    transition: 0.3s all;
    background: ${props => props.player1 ? 
                    tileColors[1] 
                : props => props.player2 ? 
                    tileColors[2] 
                        : props => props.draw ? 
                    tinycolor(tileColors[0]).darken(10).toString()
                        : null};
    &:hover {
        transform: translateY(-10px);
        background: ${props => props.player1 ? 
            tinycolor(tileColors[1]).brighten(10).toString() 
        : props => props.player2 ? 
            tinycolor(tileColors[2]).brighten(10).toString()
                : props => props.draw ? 
            tinycolor(tileColors[0]).darken(20).toString()
                : null};
    }
`

const StyledTitle = styled.span`
    font-size: 22px;
    line-height: 22px;
    display: inline-block;
    transition: 0.3s all;
    padding-top: 10px;
    ${StyledHeaderContainer}:hover & {
        letter-spacing: 0.5px;
    }

`
const StyledSubtitle = styled.span`
    transition: 0.3s all;
    font-size: 12px;
    ${StyledHeaderContainer}:hover & {
        letter-spacing: 0.5px;
    }

`

class BoardHeader extends React.Component {

  onHeaderHit = () => {
    const { click } = this.props
    if(!gameEnded()) return;
    reset(1)
    click()
  }

  render() {
    let highlightPlayer;
    let titleText;
    let subTitleText = 'Click/tap here to play again';
    if(isDrawGame()){
      titleText = 'Draw game...'
    }else if(gameEnded()){
      titleText = getPlayerName(getWinner()) + ' won!';
      highlightPlayer = getWinner();
    }else{
      titleText = getPlayerName(getCurrentPlayer()) + '\'s turn';
      highlightPlayer = getCurrentPlayer();
      subTitleText = 'Please click/tap on a tile'
    }
    return (
      <StyledHeaderContainer 
        player1={highlightPlayer === 1} 
        player2={highlightPlayer === 2} 
        draw={isDrawGame()}
        onMouseDown={this.onHeaderHit}
      >
        <StyledTitle>{titleText}</StyledTitle><br/>
        <StyledSubtitle>{subTitleText}</StyledSubtitle>
      </StyledHeaderContainer>
    );
  }

}

export default BoardHeader