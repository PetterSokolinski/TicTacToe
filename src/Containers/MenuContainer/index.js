import React from 'react'
import styled from 'styled-components'
import HeaderGame from '../../Components/HeaderGame/index.js'
import { Link } from 'react-router-dom'
import Modal from '../../Components/Modal/index.js'
import MultiStep from '../../Components/Multistep/index.js'
import PlayerOneStep from '../../Components/PlayersSteps/PlayerOneStep/index.js'
import PlayerTwoStep from '../../Components/PlayersSteps/PlayerTwoStep/index.js'
import PlayerStep from '../../Components/PlayersSteps/PlayerStep/index.js'
import { setModalSizePlayer, setModalSizeComputer, getModalVisibility, setModalVisibilityToTrue, getPlayerName } from '../../BoardFunctions/index.js'

const StyledContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 15%;
  box-shadow: 0 0px 50px hsla(0, 0, 0, 0.7);
  transform: translate(-15%, -15%);
  margin: 0 auto;
  width: 450px;
  @media (max-width: 1000px) {
    top: 90%;
    width: 100%;
  }
`

const StyledMenuItem = styled.div`
    color: white;
    height: 60px;
    width: 100%;
    align-items: center;
    color: #ecf0f1;
    cursor: pointer;
    display: flex;
    font-size: 24px;
    justify-content: center;
    letter-spacing: 4px;
    text-align: center;
    &:hover {
      font-size: 30px;
      transform: scale(1.1);
      transition: 0.5s ease;
    }
      &:nth-of-type(1) {
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        background: #f39c12;
      }
      &:nth-of-type(2) {
        background: #f39c12;
        filter: brightness(90%);
      }
      &:nth-of-type(3) {
        background: #f39c12;
        filter: brightness(80%);
      }
      &:nth-of-type(4) {
        background: #f39c12;
        filter: brightness(70%);
      }
      &:nth-of-type(5) {
        background: #f39c12;
        filter: brightness(60%);
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
      }
`
const StyledText = styled.span`
    color: white;
`

const steps = [
  {name: 'First Player', component: <PlayerOneStep whichOne="first"/>},
  {name: 'Second Player', component: <PlayerTwoStep whichOne="second"/>},
]


class MenuContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        menuItems: [
          { text: 'Continue game', to: '/game' },
          { text: 'Play versus player', to: '/game' },
          { text: 'Play versus computer', to: '/game' },
          { text: 'About', to: '/about' },
          { text: 'Author', to: '/author' },
        ],
        showModal: false,
        status: true
      }
    }
    handleToggleModal = () => {
      this.setState({ showModal: !this.state.showModal })
    }
    handleStatusClick1 = () => {
      this.setState({ status: true })
    }
    handleStatusClick2 = () => {
      this.setState({ status: false })
    }
    
    onClick1 = () => {
      setModalVisibilityToTrue()  
      setModalSizePlayer()    
      this.handleToggleModal()
      this.handleStatusClick1()
    }

    onClick2 = () => {
      setModalVisibilityToTrue()
      setModalSizeComputer()
      this.handleToggleModal()
      this.handleStatusClick2()   
    }

    
    render() {
      const { location } = this.props
      const { showModal, menuItems, status } = this.state
      return (
        <React.Fragment>
          { location.pathname === '/' ?
          <React.Fragment>
          <HeaderGame />
          <StyledContainer>
          <StyledMenuItem >
            <Link to={getPlayerName(1) !== '' ? menuItems[0].to : '/'}>
              <StyledText>{getPlayerName(1) !== '' ? menuItems[0].text.toUpperCase() : 'NO GAME TO CONTINUE'}</StyledText>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem name="vsplayer" onClick={this.onClick1}>
              <StyledText>{menuItems[1].text.toUpperCase()}</StyledText>
          </StyledMenuItem>
          <StyledMenuItem name="vscomputer" onClick={this.onClick2}>
              <StyledText>{menuItems[2].text.toUpperCase()}</StyledText>
          </StyledMenuItem>
          <StyledMenuItem>
            <Link to={menuItems[3].to}>
              <StyledText>{menuItems[3].text.toUpperCase()}</StyledText>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem >
            <Link to={menuItems[4].to}>
              <StyledText>{menuItems[4].text.toUpperCase()}</StyledText>
            </Link>
          </StyledMenuItem>
          </StyledContainer>
          </React.Fragment> 
          : null
          }
          {(showModal && location.pathname === '/' && getModalVisibility()) && <Modal onCloseRequest={() => this.handleToggleModal()}>
          { status ? <MultiStep showNavigation={true} steps={steps} /> : <PlayerStep whichOne="" />}
          </Modal> }
        </React.Fragment>
      )
    }
  }

export default MenuContainer