import React from 'react'
import styled from 'styled-components'

const StyledTileRow = styled.div`
    width: 192px;
    height: 64px;
    display: block;
`

class TileRow extends React.Component {

  render() {
    return (
      <StyledTileRow>
        {this.props.children}
      </StyledTileRow>
    );
  }

}

export default TileRow