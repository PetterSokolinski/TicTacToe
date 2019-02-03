import React from 'react'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledParagraph = styled.p`
    position: absolute;
    top: 15%;
`

const StyledText = styled.div`
    font: 600 1.5em/1 'Raleway', sans-serif; 
    color: rgba(0,0,0,.5);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .2em;
    position: absolute;
    top: 15%;
    width: 100%;
    font-size: 18px;
`


const StyledSpan = styled.span`
    font-size: 4em;
    z-index: 100;
    text-shadow: .04em .04em 0 #9cb8b3;
    font-weight: 900;
    color: #f39c12;
    white-space: nowrap;
    display: inline-block;
    position: relative;
    letter-spacing: .1em;
    padding: .2em 0 .25em 0;
    &:after {
        font-weight: 900;
        color: #f39c12;
        white-space: nowrap;
        display: inline-block;
        position: relative;
        letter-spacing: .1em;
        padding: .2em 0 .25em 0;
        content: attr(data-shadow-text);
        color: rgba(0,0,0,.35);
        text-shadow: none;
        position: absolute;
        left: .0875em;
        top: .0875em;
        z-index: -1;
        -webkit-mask-image: url(//f.cl.ly/items/1t1C0W3y040g1J172r3h/mask.png);
    }
    @media (max-width: 800px) {
        font-size: 2.5em;
      }
    @media (max-width: 500px) {
    font-size: 1.9em;
    }
`

const StyledHeader = styled.h2`
    position: relative;
    left: 50%;
    text-align: center;
    transform: translate(-50%);
`

function AboutContainer() {
    return (
    <div>
    <StyledHeader><StyledSpan data-shadow-text="About the game">About the game</StyledSpan></StyledHeader>
    <Container fluid>
    <StyledText>
      <StyledParagraph>
        This is popular and well-know game called Tic Tac Toe. You have the possibility to play the version preapared by an authour for the Graphical User Interface course.
        You propably know the rules but I will recall them to you:
        <p>1. The game is played on a grid that's 3 squares by 3 squares.</p>
        <p>2. You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares.</p>
        <p>3. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.</p>
        <p>4. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</p>
      </StyledParagraph>
      </StyledText>
    </Container>
  </div>
    )
}

export default AboutContainer