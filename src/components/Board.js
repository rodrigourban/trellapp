import React from 'react';
import List from './List';
import NewCard from './NewCard'
import { connect } from 'react-redux'
import * as apiActions from '../store/actions/api'
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import axios from 'axios'


class Board extends React.Component {

  state = {
    lists: [],
    isAdding: false,
    background: '',
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    this.props.GetLists(this.props.match.params.boardID)
  }

  onToggle = () => {
    this.setState({
      isAdding: !this.state.isAdding
    })
  }
  onCreateList = (value) => {
    this.props.CreateList(this.props.match.params.boardID, value)
    this.loadData()
  }

  onDeleteList = (listID) => {
    this.props.DeleteList(listID);
  }
  onCreateTask = (listID, payload) => {
    this.props.CreateTask(listID, payload)
    this.loadData()
  }

  onDeleteTask = (taskID) => {
    this.props.DeleteTask(taskID)
    this.loadData()
  }

  updateList = (value, index) => {
    this.props.CreateList(this.props.params.match.boardID, value, index)
    this.loadData()
  }
  deleteTask = (listID, taskID) => {
    this.props.onDeleteTask(listID, taskID)
    this.loadData()
  }
  sortItems = (firstItem, secondItem, tasklistID) => {
    axios.post('http://localhost:8000/api/tasks/reorder', { firstID: firstItem, secondID: secondItem, tasklistID: tasklistID })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    this.loadData()
  }
  render() {
    const currentList = this.props.lista.map((el) => (
      <List className="list"
        title={el.title}
        content={el.tasks}
        key={el.id}
        id={el.id}
        board={el.board}
        createTask={this.onCreateTask}
        deleteTask={this.onDeleteTask}
        deleteList={this.onDeleteList}
        sortItems={this.sortItems}
      />
    ))
    return (
      <div className="board" >
        <DndProvider backend={HTML5Backend}>
          {currentList}
          <div className="listContainer" >
            <NewCard isAdding={this.state.isAdding} title="Add a list" onToggle={this.onToggle} onAdd={this.onCreateList}></NewCard>
          </div>
        </DndProvider>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    lista: state.api.lists,
    isAddingLists: state.isAddingList,
    isAddingTask: state.isAddingTask
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GetLists: (id) => dispatch(apiActions.getLists(id)),
    DeleteList: (id) => dispatch(apiActions.deleteList(id)),
    CreateList: (id, value) => dispatch(apiActions.createList(id, value)),
    CreateTask: (listID, payload) => dispatch(apiActions.createTask(listID, payload)),
    DeleteTask: (listID, taskID) => dispatch(apiActions.deleteTask(listID, taskID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);