import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../helper'

const initialState = {
  isAddingList: false,
  isAddingTask: false,
  lists: [],
}

const getLists = (state, action) => {
  return updateObj(
    state, {
      lists: actions.lists
    }
  )
}
const createList = (state, action) => {
  const newLists = [...state.lists]
  if (action.id) {
    newLists[action.id - 1].title = action.payload
  } else {
    newLists.push(action.payload)
  }
  return updateObj(
    state, {
      lists: newLists
    }
  )
}
const deleteList = (state, action) => {
  const newLists = [...state.lists].filter(value => {
    return value.id !== action.id
  })
  return updateObj(
    state, {
      lists: newLists
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
  const newLists = [...state.lists]
  if (action.taskID) {
    console.log("updating", newLists, action.listID, action.taskID, action.value)
    newLists[action.listID - 1].content[action.taskID - 1].title = action.value
  } else {
    console.log("creating")
    newLists[action.listID - 1].content.push({
      title: action.value,
      id: newLists[action.listID - 1].content.length + 1
    })
  }
  return updateObj(
    state, {
      lists: newLists
    }
  )
}
const deleteTask = (state, action) => {
  const newLists = [...state.lists]
  const newArray = [...state.lists][action.listID - 1].content.filter((value, index, arr) => {
    return value.id !== action.taskID;
  })
  newLists[action.listID - 1].content = newArray
  return updateObj(
    state, {
      lists: newLists
    }
  )
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LISTS: return getLists(state, action);
    case actionTypes.CREATE_LIST: return createList(state, action);
    case actionTypes.UPDATE_LIST: return updateList(state, action);
    case actionTypes.DELETE_LIST: return deleteList(state, action);
    case actionTypes.CREATE_TASK: return createTask(state, action);
    case actionTypes.DELETE_TASK: return deleteTask(state, action);
    default: return state;
  }
}

export default reducer;