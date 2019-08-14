import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../helper'
import axios from 'axios';
const initialState = {
  error: null,
  isAddingList: false,
  isAddingTask: false,
  boards: [],
  lists: [],
}
const getBoards = (state, action) => {
  return updateObj(
    state, {
      boards: action.boards
    }
  )
}

const createBoard = (payload) => {
  return dispatch => {
    axios.post('http://127.0.0.1:8000/api/boards/', payload)
      .then(res => {
        dispatch(createBoardSucess(res.data))
      })
      .catch(err => {
        throw (err)
      })
  }
}


const deleteBoard = (state, action) => {
  return updateObj(
    state, {
      boards: action.boards,
      error: action.error
    }
  )
}


const getListsSuccess = (state, action) => {
  console.log(action)
  return updateObj(
    state, {
      lists: action.lists
    }
  )
}


const swapLists = (state, action) => {
  return updateObj(
    state, {
      lists: actions.lists
    }
  )
}

const createTask = (state, action) => {
  console.log(action)

  return state
}
const deleteTask = (state, action) => {
  axios.delete(`http://localhost:8000/api/tasks/${action.taskID}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  return state
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOARDS: return getBoards(state, action);
    case actionTypes.CREATE_BOARD: return createBoard(state, action);
    case actionTypes.DELETE_BOARD: return deleteBoard(state, action);
    case actionTypes.GET_LISTS_SUCESS: return getListsSuccess(state, action);
    default: return state;
  }
}

export default reducer;