import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  comments: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_COMMENT:
      let comments = state.comments;
      let data = action.payload;
      comments[data.id]=data.response.comments;
      return { ...state, comments: {...comments}};
    default:
      return state;
  }
};


export default PostsReducer;