import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions'
const editable = (WrappedComponent) => {
  class Editable extends React.Component {
    state = {
      editing: false
    }

    toggleEdit = (e) => {
      e.stopPropagation();
      if (this.state.editing) {
        this.cancel()
      } else {
        this.edit()
      }
    }

    edit = () => {
      this.setState({ editing: true }, () => {
        this.domElm.focus();
      })
    }

    save = () => {
      this.setState({
        editing: false
      }, () => {
        if (this.isValueChanged()) {
          if (this.props.taskID) {
            this.props.onUpdateTask(this.props.listID, this.domElm.textContent, this.props.taskID)
          } else {
            this.props.onUpdateList(this.domElm.textContent, this.props.listID)
          }
        }
      })
    }

    cancel = () => {
      this.setState({
        editing: false
      })
    }

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent
    }

    handleKeyDown = (e) => {
      const { key } = e;
      switch (key) {
        case 'Enter':
        case 'Escape':
          this.save()
          break
      }
    }
    render() {
      let editOnClick = true;
      const { editing } = this.state;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick
      }
      return (
        <WrappedComponent
          className={editing ? 'editing' : ''}
          onClick={editOnClick ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={(domNode) => {
            this.domElm = domNode
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          {...this.props}
        >
          {this.props.value}
        </WrappedComponent>
      )
    }
  }

  const mapDistpatchToProps = (dispatch) => {
    return {
      onUpdateList: (value, listID) => dispatch(actions.createList(value, listID)),
      onUpdateTask: (listID, value, taskID) => dispatch(actions.createTask(listID, value, taskID))
    }
  }

  return connect(null, mapDistpatchToProps)(Editable)
}

export default editable;