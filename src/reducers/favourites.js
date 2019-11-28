import { ActionType } from 'redux-promise-middleware'
import { FETCH_FAVOURITES_TYPE, TOGGLE_FAVOURITE_TYPE } from '../actions'

const initialState = {
  busy: false,
  list: []
}

// toggle item if exists in list array
const filterList = (list, id) => {
  if (list.includes(id)) {
    // remove it
    return [].filter(i => i !== id)
  }
  return [...list, id]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Pending}`:
      return {
        ...state,
        busy: true
      }
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Fulfilled}`:
      return {
        ...state,
        busy: false,
        error: undefined,
        list: action.payload
      }
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Rejected}`:
      return {
        ...state,
        busy: false,
        error: action.payload
      }
    case TOGGLE_FAVOURITE_TYPE:
      return { ...state, list: filterList(state.list, action.payload.entityId) }
    default:
      return state
  }
}

export default reducer
