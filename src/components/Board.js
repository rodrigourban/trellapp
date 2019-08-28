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
overflow-y: hidden;
overflow-x: scroll;
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
      this.props.swapList(this.state.boardID, source.index, destination.index)
    }

    if (type === 'task') {
      const destinationList = parseInt(destination.droppableId.split("l")[1]);
      const sourceList = parseInt(source.droppableId.split("l")[1]);
      this.props.swapTask(this.state.boardID, source.index, destination.index, sourceList, destinationList)
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
    swapTask: (boardID, firstID, secondID, sourceList, destinyList, tasklistID) => dispatch(apiActions.swapTask(boardID, firstID, secondID, sourceList, destinyList, tasklistID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);