import React from 'react'
import '../index.css'
import '../index.scss'
import { setPlayerName } from '../../../BoardFunctions/index.js'

class PlayerOneStep extends React.Component {
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
        const which = whichOne === 'first' ? '1st' : '2nd'
        return (
            <React.Fragment>
            <p class="script"><span>Type name of the {which} player</span></p>
            <div className="centered">
                <div className="group">
                <input type="text" id="name" value={this.state.name} onChange={this.handleChange} required />
                <label htmlFor="name">Name</label>
                <div className="bar" />
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default PlayerOneStep