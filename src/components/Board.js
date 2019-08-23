import React from 'react';
import List from './List';
import NewCard from './NewCard'
import { connect } from 'react-redux'
import * as apiActions from '../store/actions/api'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const ContainerBoard = styled.div`
display: flex;
height: 100%;
`

const Container = styled.div`
display: flex;
`


class Board extends React.Component {

  state = {
    lists: [],
    isAdding: false,
    isAddingTask: false,
    background: '',
    boardID: this.props.match.params.boardID,
  }

  componentDidMount() {
    this.props.getLists(this.state.boardID)
  }

  onToggle = () => {
    this.setState({
      isAdding: !this.state.isAdding
    })
  }
  onToggleTask = () => {
    this.setState({
      isAddingTask: !this.state.isAddingTask
    })
  }

  onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'column') {
      const firstID = this.props.lista[source.index].id;
      const secondID = this.props.lista[destination.index].id;
      this.props.swapList(this.state.boardID, firstID, secondID)
    }

    if (type === 'task') {
      const destinationList = destination.droppableId.split("l")[1];
      const sourceList = source.droppableId.split("l")[1]
      if (destinationList === sourceList) {
        const firstID = this.props.lista[sourceList].tasks[source.index].id;
        const secondID = this.props.lista[destinationList].tasks[destination.index].id;
        this.props.swapTask(this.state.boardID, firstID, secondID, null)
      } else {
        const firstID = this.props.lista[sourceList].tasks[source.index].id
        if (this.props.lista[destinationList].tasks.length <= 0 || destination.index >= this.props.lista[destinationList].tasks.length) {
          //If first of list or last
          this.props.swapTask(this.state.boardID, firstID, null, this.props.lista[destinationList].id)
        } else {
          const secondID = this.props.lista[destinationList].tasks[destination.index].id;
          this.props.swapTask(this.state.boardID, firstID, secondID, null)
        }
      }
    }
  }
  render() {
    return (
      <ContainerBoard>
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Container
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.props.lista.map((el, index) => (
                  <List className="list"
                    title={el.title}
                    content={el.tasks}
                    key={index}
                    index={index}
                    id={el.id}
                    board={el.board}

                    isAdding={this.state.isAddingTask}
                    onToggle={this.onToggleTask}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                ))}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
          <div className="listContainer" >
            <NewCard isAdding={this.state.isAdding} title="Add a list" onToggle={this.onToggle} boardID={this.state.boardID} />
          </div>
        </DragDropContext>
      </ContainerBoard>
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
    getLists: (id) => dispatch(apiActions.getLists(id)),
    swapList: (boardID, firstID, secondID) => dispatch(apiActions.swapList(boardID, firstID, secondID)),
    swapTask: (boardID, firstID, secondID, tasklistID) => dispatch(apiActions.swapTask(boardID, firstID, secondID, tasklistID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);