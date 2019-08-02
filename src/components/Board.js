import React from 'react';
import List from './List';
import NewCard from './NewCard'
import { connect } from 'react-redux'
import * as actions from '../store/actions/actions'
import { throws } from 'assert';

class Board extends React.Component {

  state = {
    lists: [],
    isAdding: false,
    background: '',
  }

  onToggle = () => {
    this.setState({
      isAdding: !this.state.isAdding
    })
  }
  onCreateList = (value) => {
    const newList = {
      title: value,
      content: [],
      id: this.props.lists.length + 1
    }
    this.props.onCreateDispatch(newList);
  }

  updateList = (value, index) => {
    const newContent = this.state.lists[index].content
    newContent.push({
      title: value,
      id: newContent.length + 1
    })
    const newList = this.state.lists
    newList[index].content = newContent
    this.setState({
      lists: newList
    })
  }
  deleteTask = (listID, taskID) => {
    this.props.onDeleteTask(listID, taskID)
    // this.setState({
    //   lists: newLists
    // })
  }
  render() {
    const currentList = this.props.lists.map((el) => (
      <List className="list"
        title={el.title}
        content={el.content}
        key={el.id}
        id={el.id}
        createTask={this.props.onCreateTask}
        deleteTask={this.deleteTask}
        deleteList={this.props.onDeleteList}
      />
    ))
    return (
      <div className="board" >
        {currentList}
        <div className="listContainer" >
          <NewCard isAdding={this.state.isAdding} title="Add a list" onToggle={this.onToggle} onAdd={this.onCreateList}></NewCard>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists,
    isAddingLists: state.isAddingList,
    isAddingTask: state.isAddingTask
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetLists: () => dispatch(actions.getLists()),
    onCreateDispatch: (payload) => dispatch(actions.createList(payload)),
    onDeleteList: (id) => dispatch(actions.deleteList(id)),
    onCreateTask: (id, value) => dispatch(actions.createTask(id, value)),
    onDeleteTask: (listID, taskID) => dispatch(actions.deleteTask(listID, taskID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);