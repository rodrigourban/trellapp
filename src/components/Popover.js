import React from 'react';

const colors = [
  'rgb(0,121,191)',
  'rgb(210,144,52)',
  'rgb(81,152,57)',
  'rgb(176,70,50)',
  'rgb(137,96,158)',
  'rgb(205,90,145)',
  'rgb(131,140,145)'
]

class Popover extends React.Component {
  state = {
    title: null,
    color: 'rgb(0,0,0)',
  }
  render() {
    const colorButtons = colors.map(color => {
      return (
        <div style={{ height: '50px', width: '50px', backgroundColor: color }}></div>
      )
    })
    return (
      this.props.isOpen ?
        <div onClick={this.props.closeModal} style={{ backgroundColor: 'rgba(1,1,1,0.4)', width: '100%', height: '100%', position: 'absolute' }}>
          <div style={{ position: 'absolute', top: '20px', right: '40%' }}>
            <div>
              <div style={{ backgroundColor: this.color }}>
                <input placeholder="Add board title x" />
              </div>

              <div>{colorButtons}</div>
            </div>
            <button disabled={this.state.title === null}>Create Board disabled until title has changed</button>
          </div>
        </div>
        :
        null
    )
  }
}

export default Popover;