import React from 'react'
import './index.css'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledLeftButton = styled.div`
  position: relative;
  right: -29%;
  width: 150px;
  @media (max-width: 700px) {
    left: 20%;
  }
  @media (max-width: 600px) {
    left: 15%;
  }
`
const StyledRightButton = styled.span`
  position: relative;
  left: 50%;
  width: 150px;
  @media (max-width: 750px) {
    left: 35%;
  }
  @media (max-width: 600px) {
    left: 20%;
  }
`

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const StyledSteps = styled.div`
  width: 331px;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  @media (max-width: 1100px) {
    left: 45%;
  }
  @media (max-width: 800px) {
    left: 45%;
  }
  @media (max-width: 700px) {
    left: 80%;
  }
  @media (max-width: 650px) {
    left: 85%;
  }
  @media (max-width: 600px) {
    left: 90%;
  }
  @media (max-width: 550px) {
    left: 95%;
  }
  @media (max-width: 500px) {
    left: 105%;
  }
`
const getNavStates = (indx, length) => {
  let styles = []
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done')
    } else if (i === indx) {
      styles.push('doing')
    } else {
      styles.push('todo')
    }
  }
  return { current: indx, styles: styles }
}

const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true
    }
  } else if (currentStep === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    }
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false
    }
  }
}

export default class MultiStep extends React.Component {
  state = {
    showPreviousBtn: false,
    showNextBtn: true,
    compState: 0,
    navState: getNavStates(0, this.props.steps.length)
  }

  setNavState = next => {
    this.setState({
      navState: getNavStates(next, this.props.steps.length)
    })
    if (next < this.props.steps.length) {
      this.setState({ compState: next })
    }
    this.setState(checkNavState(next, this.props.steps.length))
  }

  handleKeyDown = evt => {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick = evt => {
    if (
      evt.currentTarget.value === this.props.steps.length - 1 &&
      this.state.compState === this.props.steps.length - 1
    ) {
      this.setNavState(this.props.steps.length)
    } else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  next = () => {
    this.setNavState(this.state.compState + 1)
  }

  previous = () => {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  getClassName = (className, i) => {
    return className + '-' + this.state.navState.styles[i]
  }

  renderSteps = () => {
    return this.props.steps.map((s, i) => (
      <li
        className={this.getClassName('progtrckr', i)}
        onClick={this.handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ))
  }

  render () {
    return (
      <StyledContainer>
        <div className='container' onKeyDown={this.handleKeyDown}>
          <ol className='progtrckr'>
          <StyledSteps>
            {this.renderSteps()}
            </StyledSteps>
          </ol>
          {this.props.steps[this.state.compState].component}
        </div>
          <div style={this.props.showNavigation ? {} : { display: 'none' }}>
          <StyledLeftButton><Button color='red'
            content='Previous'
            icon='left arrow'
            labelPosition='left'
            style={this.state.showPreviousBtn ? {} : { display: 'none' }}
            onClick={this.previous}
          /></StyledLeftButton>

          <StyledRightButton><Button color='red'
            content='Next'
            icon='right arrow'
            labelPosition='right'
            style={this.state.showNextBtn ? {} : { display: 'none' }}
            onClick={this.next}
          /></StyledRightButton>
        </div>
      </StyledContainer>
    )
  }
}