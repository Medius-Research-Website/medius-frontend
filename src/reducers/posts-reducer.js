import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  pctChange: 0,
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.GET_PCT_CHANGE:
      return { ...state, pctChange: action.payload };
    default:
      return state;
  }
};


export default PostsReducer;