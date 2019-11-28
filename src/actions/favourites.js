/* global fetch:false */
export const FETCH_FAVOURITES_TYPE = 'FETCH_FAVOURITES'
export const TOGGLE_FAVOURITE_TYPE = 'TOGGLE_FAVOURITE'
export const PUT_FAVOURITE_TYPE = 'PUT_FAVOURITE_TYPE'

export const fetchFavouritesActionCreator = promise => ({
  type: FETCH_FAVOURITES_TYPE,
  payload: promise
})

// remove the event from favourites
export const deleteFavourite = async (url, eventId) => {
  return fetch(`${url}/${eventId}`, { method: 'DELETE' })
}

// put the event to favourites
export const putFavourite = async (url, eventId) => {
  return fetch(`${url}/${eventId}`, { method: 'PUT' })
}

export const toggleFavouriteActionCreator = entityId => ({
  type: TOGGLE_FAVOURITE_TYPE,
  payload: { entityId }
})
