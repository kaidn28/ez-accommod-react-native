import defaultState from './state'
function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {...state, isLoggedIn: true}
    
    default:
      return state
  }
}

export default reducer