/* global fetch:false */
import { REHYDRATED, fetchFavouritesActionCreator } from '../actions'
import { getFavouritesApiUrl } from '../selectors'

const fetchFavourites = async (apiUrl) => {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()
  console.log(data)
  return data
}

const getApiFavourits = (store) => {
  return getFavouritesApiUrl(store.getState())
}
export default store => next => action => {
  const ret = next(action)
  if (action.type === REHYDRATED) {
    const apiFavouritesUrl = getApiFavourits(store)
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(apiFavouritesUrl)))
  }
  return ret
}
