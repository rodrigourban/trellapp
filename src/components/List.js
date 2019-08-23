import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as apiActions from '../store/actions/api'
import NewCard from './NewCard'
import Editable from '../hoc/Editable';
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'


const Title = styled.div`
padding: 8px;
font-weight: 400;
margin-top: 10px;
margin-left: 10px;
margin-bottom: 10px;
display: flex;
justify-content: space-between;`

const Container = styled.div`
min-width: 272px;
margin: 8px;
padding: 8px;
border-radius: 2px;
display: flex;
flex-direction: column;
align-self: flex-start;
background-color: #dfe1e6;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

class List extends React.Component {
  state = {
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
  render() {
    const EditTitle = Editable('div')
    console.log(this.props.index)
    return (
      <Draggable key={this.props.id} draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Title>
              <EditTitle className="text" value={this.props.title} listID={this.props.id} boardID={this.props.board} />
              <button className="button" onClick={() => this.props.deleteList(this.props.board, this.props.id)}>...</button>
            </Title>
            <Droppable droppableId={"l" + this.props.index} type="task">
              {(provided) => (
                <div className="list-content"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.props.content.map((task, index) =>
                    (<Task
                      boardID={this.props.board}
                      listID={this.props.id}
                      key={task.id}
                      value={task.title}
                      id={task.id}
                      index={index}
                    />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <NewCard isAdding={this.state.isAdding} title="Add a card" onToggle={this.onToggle} boardID={this.props.board} listID={this.props.id} />
          </Container>
        )}
      </Draggable>
    )
  }
}
const mapPropsToState = dispatch => {
  return {
    deleteList: (boardID, id) => dispatch(apiActions.deleteList(boardID, id)),
    createTask: (boardID, listID, payload) => dispatch(apiActions.createTask(boardID, listID, payload)),
  }
}


export default connect(null, mapPropsToState)(List);