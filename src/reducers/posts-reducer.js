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
    case ActionTypes.ADD_COMMENT: // needs it's own reducer to support hot reloading
    let currComments = state.comments;
    currComments[action.payload.postID].push(action.payload.newComment);
      return { ...state, comments: {...currComments} };
    case ActionTypes.ADD_POST: // needs it's own reducer to support hot reloading
    console.log(state.all);
    let currPosts = state.all;
    currPosts[currPosts.length] = action.payload.newPost;
    console.log(currPosts);
      return { ...state, all: currPosts };
    case ActionTypes.FETCH_USER_POSTS:
      return {...state, all: action.payload }
    default:
      return state;
  }
};


export default PostsReducer;