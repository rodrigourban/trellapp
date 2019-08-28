import React from 'react'
import { connect } from 'react-redux'
import * as apiActions from '../store/actions/api'
import styled from 'styled-components'

const Container = styled.div`
width: 100%;
background: wheat;
background-color: rgba(1,1,1,0.3);
border-radius: 5px;
padding: 7px;
`
const AddContainer = styled.div`
background-color: rgba(0,0,0,0.2);
border-radius: 5px;
padding: 3px;
width: 100%;
`
const CustomInput = styled.input`
height: 36px;
padding: 5px;
width: 100%;
margin-bottom: 3px;
border-radius: 3px ;
`
const AddBtn = styled.button`
height: 30px;
width: 50px;
color: white;
background-color: rgb(90,172,68);
padding: 0;
border-width: 0;
outline: none;
border-radius: 2px;
`
const CloseBtn = styled.button`
height: 30px;
width: 30px;
background-color: transparent;
padding: auto;
border-width: 0;
outline: none;
border-radius: 2px;
`


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
    if (this.props.listID) {
      this.props.onCreateTask(this.props.boardID, this.props.listID, this.state.value)
    } else {
      this.props.onCreateList(this.props.boardID, this.state.value)
    }
    this.props.onToggle()
  }
  render() {
    const content = this.props.isAdding ?
      <AddContainer>
        <CustomInput placeholder={this.props.title} onChange={this.onChange} />
        <AddBtn onClick={this.onAdd}>Add</AddBtn>
        <CloseBtn onClick={this.props.onToggle}>X</CloseBtn>
      </AddContainer >
      :
      <Container onClick={this.props.onToggle}>
        {this.props.title}
      </Container>
    return content;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateList: (boardID, value) => dispatch(apiActions.createList(boardID, value)),
    onCreateTask: (boardID, listID, payload) => dispatch(apiActions.createTask(boardID, listID, payload)),
  }
}

export default connect(null, mapDispatchToProps)(NewCard);