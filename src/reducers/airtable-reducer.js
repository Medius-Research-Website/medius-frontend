import { ActionTypes } from '../actions';

const initialState = {
  opportunities: [],
};

const AirtableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OPPORTUNITIES:
      return { ...state, opportunities: action.payload };
    default:
      return state;
  }
};


export default AirtableReducer;
