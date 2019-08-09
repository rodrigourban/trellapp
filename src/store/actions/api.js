import * as action from './actionTypes'
import axios from 'axios'

export const getBoards = () => {
  return {
    type: action.GET_BOARDS
  }
}

export const createBoard = (payload, id = null) => {
  return {
    type: action.CREATE_BOARD,
    payload: payload,
    boardID: id
  }
}

export const deleteBoard = (id) => {
  return {
    type: action.DELETE_BOARD,
    boardID: id
  }
}

export const getLists = (id) => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/tasklists/${id}`)
      .then(res => {
        dispatch(getListsSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const getListsSuccess = (lists) => {
  return {
    type: action.GET_LISTS_SUCESS,
    lists: lists
  }
}


export const createList = (boardID, payload, listID = null) => {
  return {
    type: action.CREATE_LIST,
    payload: payload,
    boardID: boardID,
    listID: listID
  }
}

export const deleteList = (id) => {
  return {
    type: action.DELETE_LIST,
    listID: id,
  }
}

export const getTasks = (listID) => {
  return {
    type: action.GET_TASKS,
    listID: listID
  }
}

export const createTask = (listID, payload, taskID = null) => {
  return {
    type: action.CREATE_TASK,
    listID: listID,
    payload: payload,
    taskID: taskID
  }
}

export const deleteTask = (taskID) => {
  return {
    type: action.DELETE_TASK,
    taskID: taskID
  }
}