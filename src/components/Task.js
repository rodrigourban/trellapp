import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as apiActions from '../store/actions/api'
import editable from '../hoc/Editable'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
position: relative;
background: rgb(255,255,255),
box-shadow: rgba(9, 30, 66, 0.25) 1px 1px 0px,
border-radius: 2px;
border: 1px solid lightgrey;
padding: 16px;
margin-bottom: 15px;
`

class Task extends React.Component {
  render() {
    const EditTitle = editable('div')
    return (
      <Draggable draggableId={this.props.id} index={this.props.index} key={this.props.id}>
        {(provided) => (
          <Container
            key={this.props.id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <EditTitle
              value={this.props.value}
              listID={this.props.listID}
              taskID={this.props.id}
              boardID={this.props.boardID}
            />
            <div onClick={(board, listID, taskID) => this.props.deleteTask(this.props.boardID, this.props.id)} style={{ width: '30px', position: 'absolute', right: '-15px', top: '-8px', color: 'black' }}><i class="material-icons">
              delete
            </i></div>
          </Container>
        )
        }
      </Draggable>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTask: (boardID, taskID) => dispatch(apiActions.deleteTask(boardID, taskID)),
  }
}

export default connect(null, mapDispatchToProps)(Task);