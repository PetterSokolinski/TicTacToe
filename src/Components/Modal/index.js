import React, { Component } from "react";
import isNil from "lodash/fp/isNil";
import styled, {keyframes} from 'styled-components'
import { getModalSize } from '../../BoardFunctions/index.js'

const ModalAppear = keyframes`
    0%: {
        display: none;
        opacity: 0;
    }
    1%: {
        display: flex;
        opacity: 0
    }
    100%: {
        opacity: 1;
    }
`

const ModalOverlay = styled.div`
    display: flex;
    alignn-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
    opacity: 1;
    animation: ${ModalAppear} .5s ease;
    overflow-x: hidden;
    overflow-y: auto;
`

const StyledModal = styled.div`
    background-color: #fff;
    border-radius: 25px;
    height: ${getModalSize() === true ? '62%' : '50%'}
    width: 50%;
    box-shadow: 0, 0, 0.625rem, rgba(0, 0, 0, 0.2);
    @media (min-width: 576px): {
        width: 32rem;
    }
`
const StyledContentModal = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`
const StyledCloseButton = styled.button`
    position: fixed;
    top: 0;
    right: 0;
    background: grey;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: 0;
    cursor: pointer;
    outline: 0;
    box-shadow: 0, 0, 0.625rem, rgba(0, 0, 0, 0.2);

    &:before, &:after {
      content: "";
      position: absolute;
      top: 1.2rem;
      left: 0.25rem;
      width: 2rem;
      height: 0.1rem;
      background-color: black;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }

    &:hover:before, &:hover:after {
      background-color: #444;
    }

`


class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      }
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const { onCloseRequest, children } = this.props;
    return (
      <ModalOverlay>
        <StyledModal ref={node => (this.modal = node)}>
          <StyledContentModal>{children}</StyledContentModal>
        </StyledModal>
        <StyledCloseButton
          onClick={onCloseRequest}
        />
      </ModalOverlay>
    );
  }
}

export default Modal
