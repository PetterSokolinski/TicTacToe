import React from 'react'
import { Label } from 'semantic-ui-react'
import { getPlayerName, getPlayerPoints } from '../../BoardFunctions/index.js'
import styled from 'styled-components'

const StyledLabel = styled.label`
    position: absolute;
    left: ${props => props.whichOne === 1 ? '10%' : ''};
    right: ${props => props.whichOne === 2 ? '10%' : ''};
    top: 20%;
    @media (max-width: 1000px) {
        left: ${props => props.whichOne === 1 ? '0' : ''};
        right: ${props => props.whichOne === 2 ? '0' : ''};
      }
      @media (max-width: 800px) {
        top: 400px;
      }
      @media (max-width: 500px) {
        top: ${props => props.whichOne === 2 ? '460px' : ''};
        left: 75%;
        transform: translateX(-50%);
        width: 100%;
      }

`
class PointsLabel extends React.Component {


    render() {
        const { whichOne } = this.props
        return (
            <StyledLabel whichOne={whichOne}>
            <Label image pointing size='massive' color={whichOne === 1 ? 'blue' : 'orange'}>
            <img src={require('../../Assets/points.jpg')} alt=''/>
            {getPlayerName(whichOne)}: {getPlayerPoints(whichOne)}</Label>
            
            </StyledLabel>

        )
    }
}

export default PointsLabel