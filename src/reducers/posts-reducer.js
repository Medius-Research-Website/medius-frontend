import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  comments: {},
  priceChange:{},
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
      currentComments[action.payload.id]=action.payload.comments;
      return { ...state, comments: {...currentComments}};
    case ActionTypes.FETCH_PRICE_CHANGE:
      let currentPriceChange=state.priceChange;
      currentPriceChange[action.payload.id]=action.payload.change;
      return {...state, priceChange:{...currentPriceChange}};
    case ActionTypes.SINGLE_PRICE_CHANGE:
      console.log(action.payload);
      return {...state, singlePriceChange: action.payload.change, singleCurrVal: action.payload.currVal };
    case ActionTypes.ADD_COMMENT:
    let currentCommentss = state.comments;
      return { ...state, comments: {...currentCommentss, comment: action.payload } };
    default:
      return state;
  }
};


export default PostsReducer;