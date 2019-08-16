import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../helper'

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




const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOARDS_SUCCESS: return getBoardsSuccess(state, action);
    case actionTypes.GET_LISTS_SUCESS: return getListsSuccess(state, action);
    default: return state;
  }
}

export default reducer;