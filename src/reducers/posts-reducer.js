import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  comments: {},
  priceChange:{},
  newPostModal:false,
  singlePriceChange: 0,
  text: [],
  singleCurrVal: 0,
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_COMMENT:
      let currentComments = state.comments;
      currentComments[action.payload.postID]=action.payload.comments;
      return { ...state, comments: {...currentComments}};
    case ActionTypes.FETCH_PRICE_CHANGE:
      let currentPriceChange=state.priceChange;
      currentPriceChange[action.payload.id]=action.payload.change;
      return {...state, priceChange:{...currentPriceChange}};
    case ActionTypes.TOGGLE_NEW_POST_MODAL:
      return {...state, newPostModal: !state.newPostModal};
    case ActionTypes.SINGLE_PRICE_CHANGE:
      return {...state, singlePriceChange: action.payload.change, singleCurrVal: action.payload.currVal };
    case ActionTypes.ADD_COMMENT: 
    let currComments = [...state.comments];
      currComments[action.payload.postID].unshift(action.payload.newComment);
      return { ...state, comments: {...currComments} };
    case ActionTypes.ADD_POST: 
      let currPosts = [action.payload.newPost,...state.all];
      return { ...state, all: currPosts };
    case ActionTypes.FETCH_USER_POSTS:
      return {...state, all: action.payload.posts }
    default:
      return state;
  }
};


export default PostsReducer;