import React from 'react'
import Aux from '../hoc/AuxHoc'
class NewCard extends React.Component {
  state = {
    value: ""
  }
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    })
  }
  onAdd = () => {
    this.props.onAdd(this.state.value)
    this.props.onToggle()
  }
  render() {
    const content = this.props.isAdding ?
      <div className={"addBox" + " " + this.props.styles}>
        <input placeholder={this.props.title} className="addInput" onChange={this.onChange} />
        <button onClick={this.onAdd}>Add</button>
        <button onClick={this.props.onToggle}>X</button>
      </div >
      :
      <div className={"listBox" + " " + this.props.styles} onClick={this.props.onToggle}>
        <a className="addButton">+ {this.props.title}</a>
      </div>
    return (
      <Aux>{content}</Aux>
    )
  }
}

export default NewCard;