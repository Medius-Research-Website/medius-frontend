import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  FETCH_COMMENT:'FETCH_COMMENT',
  FETCH_PRICE_CHANGE:'FETCH_PRICE_CHANGE',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  CLEAR: 'CLEAR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EXISTING_USER: 'EXISTING USER',
};

// trigger to deauth if there is error
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function clear() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR })
  }
}

// fetches all relevant information about current user
export function signinUser(user, history) {
console.log('pushing sign in user');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: user });
        localStorage.setItem('token', response.data.token);
        history.push('/landingpage');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.INVALID_CREDENTIALS });
      });
  };
}
  
export function signupUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user)
      .then((response) => {
        console.log("success");
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/landingpage');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.EXISTING_USER });
        history.push('/signup');
      });
  };
}
  
// deletes token from localstorage and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

// returns public information for all users (need to narrow this, how do we want to present profiles?)
export function fetchUsers() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USERS, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
}

// only returns public information for a user
export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${id}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
}

// only can update current user
export function updateUser(id, fields) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${id}/`, fields)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
}
  

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}/`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
}

export function fetchPriceChange(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/ticker/${id}/`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_PRICE_CHANGE, payload: {...response.data, id }});
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
}

export function fetchCommentsByPost(id){
  return (dispatch)=>{
    axios.get(`${ROOT_URL}/posts/comments/${id}/`,{ headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({type: ActionTypes.FETCH_COMMENT, payload: {...response.data,id }} )
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  }
}

export function createPost(post, history) {
  axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(() => { history.push('/'); })
    .catch((error) => {
      // dispatch an error, in separate error reducer
      console.log(error);
    });
}

export function updatePost(id, post, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}/`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch(authError(`Update Failed: ${error.response.data}`));
        history.push('/');
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => { history.push('/'); })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
}


