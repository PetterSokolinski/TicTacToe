import React from 'react'
import '../index.css'
import '../index.scss'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { setPlayerName, changeGameModeToComputer } from '../../../BoardFunctions/index.js'
const StyledPlayButton = styled.div`
    position: relative;
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
    top: 55%
`

class PlayerStep extends React.Component {
    state = {
        name: ''
    }
    handleChange = (event) => {
        const { whichOne } = this.props
        this.setState({name: event.target.value})
        setPlayerName(whichOne, event.target.value)
    }
    render() {
        const { whichOne } = this.props
        return (
            <React.Fragment>
            <p class="script"><span>Type name of the {whichOne} player</span></p>
            <div className="centered">
                <div className="group">
                <input type="text" id="name" value={this.state.name} onChange={this.handleChange} required />
                <label htmlFor="name">Name</label>
                <div className="bar" />
                </div>
            </div>
            <StyledPlayButton>
                {this.state.name !== '' && <Link to='/game'>
                <Button fluid color='green' size='large' onClick={changeGameModeToComputer}>Play</Button>
                </Link>}
                </StyledPlayButton>
            </React.Fragment>
        )
    }
}

export default PlayerStep