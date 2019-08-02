import React from 'react';
import Editable from '../hoc/Editable'

const colors = {
  blue: 'rgb(0,121,191)',
  orange: 'rgb(210,144,52)',
  green: 'rgb(81,152,57)',
  red: 'rgb(176,70,50)',
  purple: 'rgb(137,96,158)',
  pink: 'rgb(205,90,145)',
  grey: 'rgb(131,140,145)',
}

class createBoard extends React.Component {
  state = {
    background: null,
    title: "",
  }

  render() {
    return (
      <div isOpen={this.props.isOpen}>
        <div>
          Body with color and a X to close fixed to right up corner
        </div>
        <div>
          buttons with colors to choose from and change background.
        </div>
      </div>
    )
  }
}