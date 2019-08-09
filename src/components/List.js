import React from 'react';
import NewCard from './NewCard'
import Editable from '../hoc/Editable';
import axios from 'axios';

class List extends React.Component {
  state = {
    value: "",
    isAdding: false,
  };
  onToggle = () => {
    this.setState({
      isAdding: !(this.state.isAdding)
    })
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  onCreateCard = (value) => {
    this.props.createTask(this.props.id, value)
  }
  onDelete = (taskID) => {
    this.props.deleteTask(taskID)
  }
  onDeleteList = (listID) => {
    this.props.deleteList(listID)
  }
  onDragStart = (e, id) => {
    this.setState({
      dragged: id
    })
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20)
  }
  onDragOver = (index) => {
    console.log("dragged over ", index)
    // if the item is dragged over itself, ignore
    // if (this.draggedItem === draggedOverItem) {
    // return;
    // }

    // filter out the currently dragged item
    // let items = this.state.items.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    // items.splice(index, 0, this.draggedItem);
  }
  onDragEnd = () => {
    console.log("drag end")
  }
  render() {
    const EditTitle = Editable('div')
    return (
      <div className="listContainer list" draggable onDragStart={(e) => this.onDragStart(e, this.props.id)} onDragEnd={this.onDragEnd} onDragOver={this.onDragOver(this.props.id)}>
        <div className="list-title" ><EditTitle className="text" value={this.props.title} listID={this.props.id} boardID={this.props.board}></EditTitle><button className="button" onClick={() => this.onDeleteList(this.props.id)}>...</button></div>
        <div className="list-content">
          {this.props.content.map(task =>
            (<li className="task"
              key={task.id}>
              <EditTitle
                value={task.title}
                listID={this.props.id}
                taskID={task.id} />
              <button onClick={() => this.onDelete(task.id)}>...</button>
            </li>))}
        </div>
        <NewCard styles="listAdd" isAdding={this.state.isAdding} title="Add a card" onToggle={this.onToggle} onAdd={this.onCreateCard}></NewCard>
      </div>
    )
  }
}

export default List;