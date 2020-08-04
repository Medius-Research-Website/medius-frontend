import { ActionTypes } from '../actions';

const initialState = {
  userExists: false,
  invalidCredentials: false,
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EXISTING_USER:
      return { ...state, userExists: true };
    case ActionTypes.INVALID_CREDENTIALS:
      return { ...state, invalidCredentials: true };
    case ActionTypes.CLEAR:
      return { ...state, userExists: false, invalidCredentials: false }
    default:
      return state;
  }
};


export default ErrorReducer;
