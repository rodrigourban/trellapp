import React from 'react';
import axios from 'axios';
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

  handleClose = (event) => {
    if (event.currentTarget === event.target) {
      this.props.closeModal()
    }
  }

  handleCreate = () => {
    const payload = {
      title: this.state.title,
      background: this.state.color
    }
    axios.post('http://localhost:8000/api/boards/', payload)
      .then(res => {
        console.log(res)
        this.props.closeModal()
      })
      .catch(err => {
        throw (err)
      })
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleColor = (clickedColor) => {
    this.setState({
      color: clickedColor
    })
  }

  render() {
    const colorButtons = colors.map((color, key) => {
      return (
        <div key={key} style={{ height: '50px', width: '50px', backgroundColor: color }} onClick={() => this.handleColor(color)}></div>
      )
    })
    return (
      this.props.isOpen ?
        <div onClick={this.handleClose} style={{ backgroundColor: 'rgba(1,1,1,0.4)', width: '100%', height: '100%', position: 'absolute', zIndex: '5' }}>
          <div style={{ position: 'absolute', top: '20px', right: '40%' }}>
            <div>
              <div style={{ backgroundColor: this.color }}>
                <input placeholder="Add board title x" onChange={this.handleChange} />
              </div>

              <div>{colorButtons}</div>
            </div>
            <button disabled={this.state.title === null} onClick={this.handleCreate}>Create Board</button>
          </div>
        </div>
        :
        null
    )
  }
}

export default Popover;