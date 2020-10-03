import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  user: [], // stored information about CURRENT user
  selectedUser: [], // information for public viewing about other users
  all: [], // consider separate reducer?
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true, user: action.payload };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false };
    case ActionTypes.FETCH_USER:
      return { ...state, selectedUser: action.payload };
    case ActionTypes.FETCH_USERS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_CURRENT_USER:
        return { ...state, authenticated: true, user: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;