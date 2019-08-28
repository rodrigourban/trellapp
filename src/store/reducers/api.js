import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../helper'
import axios from 'axios'
import { config } from '../../Constants'

const initialState = {
  error: null,
  isAddingList: false,
  isAddingTask: false,
  boards: [],
  lists: [],
}
const getBoardsSuccess = (state, action) => {
  return updateObj(
    state, {
      boards: action.payload
    }
  )
}


const getListsSuccess = (state, action) => {
  return updateObj(
    state, {
      lists: action.lists
    }
  )
}

const swapList = (state, action) => {
  //First optimistic update, and then api call
  const firstID = state.lists[action.firstID].id;
  const secondID = state.lists[action.secondID].id;


  axios.post(`${config.url.API_URL}/api/tasklists/reorder`, { firstID: firstID, secondID: secondID })
    .then(res => {

    })
    .catch(err => {

    })

  const newList = state.lists
  const movable = newList[action.firstID]
  newList.splice(action.firstID, 1)
  newList.splice(action.secondID, 0, movable)

  return updateObj(
    state, {
      lists: newList
    }
  )
}

const swapTask = (state, action) => {
  // Do api and optimistic update
  let payload = {}
  if (action.destinyList === action.sourceList) {
    const firstID = state.lists[action.sourceList].tasks[action.firstID].id;
    const secondID = state.lists[action.destinyList].tasks[action.secondID].id;
    payload = {
      firstID: firstID,
      secondID: secondID
    }
  } else {
    const firstID = state.lists[action.sourceList].tasks[action.firstID].id
    if (state.lists[action.destinyList].tasks.length <= 0 || action.secondID >= state.lists[action.destinyList].tasks.length) {
      //If first of list or last
      payload = {
        firstID: firstID,
        tasklistID: state.lists[action.destinyList].id
      }
    } else {
      const secondID = state.lists[action.destinyList].tasks[action.secondID].id;
      payload = {
        firstID: firstID,
        secondID: secondID
      }
    }
  }

  const newList = state.lists
  const movable = newList[action.sourceList].tasks[action.firstID]
  newList[action.sourceList].tasks.splice(action.firstID, 1)
  newList[action.destinyList].tasks.splice(action.secondID, 0, movable)

  axios.post(`${config.url.API_URL}/api/tasks/reorder`, payload)
    .then(res => {

    })
    .catch(err => {

    })

  return updateObj(
    state, {
      lists: newList
    }
  )
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOARDS_SUCCESS: return getBoardsSuccess(state, action);
    case actionTypes.GET_LISTS_SUCESS: return getListsSuccess(state, action);
    case actionTypes.SWAP_LIST: return swapList(state, action);
    case actionTypes.SWAP_TASK: return swapTask(state, action);
    default: return state;
  }
}

export default reducer;