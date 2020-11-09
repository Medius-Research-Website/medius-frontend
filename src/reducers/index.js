import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';
import AirtableReducer from './airtable-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  airtable: AirtableReducer,
});

export default rootReducer;