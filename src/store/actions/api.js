import * as action from './actionTypes'
import axios from 'axios'
import { config } from '../../Constants'

export const swapList = (boardID, firstID, secondID) => {
  return dispatch => {
    axios.post(`${config.url.API_URL}/api/tasklists/reorder`, { firstID: firstID, secondID: secondID })
      .then(res => {
        dispatch(getLists(boardID))
      })
      .catch(err => {
        dispatch(getLists(boardID))
      })
  }
}

export const swapTask = (boardID, tasklistID, firstID, secondID = null) => {
  return dispatch => {
    axios.post(`${config.url.API_URL}/api/tasks/reorder`, { firstID: firstID, secondID: secondID, tasklistID: tasklistID })
      .then(res => {
        console.log(res)
        dispatch(getLists(boardID))
      })
      .catch(err => {
        console.log(err)
        dispatch(getLists(boardID))
      })
  }
}


export const getBoards = () => {
  return dispatch => {
    axios.get(`${config.url.API_URL}/api/boards/`)
      .then(res => {
        dispatch(getBoardsSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getBoardsSuccess = (payload) => {
  return {
    type: action.GET_BOARDS_SUCCESS,
    payload: payload,
  }
}

export const createBoard = (payload, id = null) => {
  return dispatch => {
    axios.post(`${config.url.API_URL}/api/boards/`, payload)
      .then(res => {
        dispatch(getBoards())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const deleteBoard = (id) => {
  return dispatch => {
    axios.delete(`${config.url.API_URL}/api/boards/${id}`)
      .then(res => {
        console.log("borrado exitosamente")
        dispatch(getBoards())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getLists = (id) => {
  return dispatch => {
    axios.get(`${config.url.API_URL}/api/tasklists/${id}`)
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


export const deleteList = (boardID, listID) => {
  return dispatch => {
    axios.delete(`${config.url.API_URL}/api/tasklists/${listID}`)
      .then(res => {
        dispatch(getLists(boardID))
      })
      .catch(err => {
        dispatch(getLists(boardID))
      })
  }
}

export const createTask = (boardID, listID, payload, taskID = null) => {
  return dispatch => {
    console.log(boardID, taskID, payload, listID)
    if (taskID) {
      axios.put(`${config.url.API_URL}/api/tasks/${taskID}`, payload)
        .then(res => {
          console.log(res)
          dispatch(getLists(boardID))
        })
        .catch(err => {
          console.log(err)
          dispatch(getLists(boardID))
        })
    } else {
      axios.post(`${config.url.API_URL}/api/tasks/`, { title: payload, task_list: listID })
        .then(res => {
          console.log(res)
          dispatch(getLists(boardID))
        })
        .catch(err => {
          console.log(err)
          dispatch(getLists(boardID))
        })
    }
  }
}

export const deleteTask = (boardID, taskID) => {
  return dispatch => {
    axios.delete(`${config.url.API_URL}/api/tasks/${taskID}`)
      .then(res => {
        console.log(res)
        dispatch(getLists(boardID))
      })
      .catch(err => {
        console.log(err)
        dispatch(getLists(boardID))
      })
  }
}

export const createList = (boardID, payload, listID = null) => {
  return dispatch => {
    if (listID) {
      axios.put(`${config.url.API_URL}/api/tasklists/${listID}`, payload)
        .then(res => {
          dispatch(getLists(boardID))
        })
        .catch(err => console.log(err))
    } else {
      axios.post(`${config.url.API_URL}/api/tasklists/`, { title: payload, board: boardID })
        .then(res => {
          dispatch(getLists(boardID))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}