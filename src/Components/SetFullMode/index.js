import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
    border: 0;
    border-radius: 0.25rem;
    background: #f39c12;
    color: white;
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 2.8;
    white-space: nowrap;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    cursor: pointer;
    text-align: center;
    width: 150px;
    left: 50%;
    top: 500%;
    transform: translateX(-50%);
    position: relative;
    height: 50px;
`

class SetFullMode extends React.Component {

    render() {
        const { goFull } = this.props
        return (
                <StyledButton onClick={goFull}>Set full mode</StyledButton>
        )
    }
}

export default SetFullMode