import * as actionTypes from './actionTypes';

export const getLists = () => {
  return {
    type: actionTypes.GET_LISTS
  }
}

export const createList = (payload, id = null) => {
  return {
    type: actionTypes.CREATE_LIST,
    payload: payload,
    id: id
  }
}

export const deleteList = (id) => {
  return {
    type: actionTypes.DELETE_LIST,
    id: id,
  }
}

export const getTasks = () => {
  return {
    type: actionTypes.GET_TASKS
  }
}

export const createTask = (listID, value, taskID = null) => {
  return {
    type: actionTypes.CREATE_TASK,
    listID: listID,
    value: value,
    taskID: taskID
  }
}

export const deleteTask = (listID, taskID) => {
  return {
    type: actionTypes.DELETE_TASK,
    listID: listID,
    taskID: taskID
  }
}