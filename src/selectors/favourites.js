export const createIsFavouritedSelector = id => ({ favourites }) => favourites.list.includes(id)
