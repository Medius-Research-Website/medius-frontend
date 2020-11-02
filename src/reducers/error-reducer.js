import { ActionTypes } from '../actions';

const initialState = {
  userExists: false,
  invalidCredentials: false,
  incompleteForm: false,
  isError:false,
  messages:[]
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EXISTING_USER:
      return { ...state, userExists: true };
    case ActionTypes.INVALID_CREDENTIALS:
      return { ...state, invalidCredentials: true };
    case ActionTypes.CLEAR:
      return { ...state, userExists: false, invalidCredentials: false }
    case ActionTypes.INCOMPLETE_FORM:
      return { ...state, incompleteForm: true}
    case ActionTypes.SET_ERROR:
      let errorMessages=[...state.messages];
      if (!errorMessages.includes(action.payload)) errorMessages.push(action.payload);
      return { ...state, isError:true, messages:errorMessages}
    case ActionTypes.CLEAR_ERROR:
      return { ...state, isError:false, messages:[]}
    default:
      return state;
  }
};


export default ErrorReducer;
