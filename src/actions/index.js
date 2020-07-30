import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// trigger to deauth if there is error
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// fetches all relevant information about current user
export function signinUser(user, history) {
    return (dispatch) => {
      axios.post(`${ROOT_URL}/signin`, user)
        .then((response) => {
          dispatch({ type: ActionTypes.AUTH_USER, payload: user });
          localStorage.setItem('token', response.data.token);
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          dispatch(authError(`Sign In Failed: ${error.response.data}`));
        });
    };
  }
  
  export function signupUser(user, history) {
    return (dispatch) => {
      axios.post(`${ROOT_URL}/signup`, user)
        .then((response) => {
          dispatch({ type: ActionTypes.AUTH_USER });
          localStorage.setItem('token', response.data.token);
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          dispatch(authError(`Sign Up Failed: ${error.response.data}`));
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
    axios.get(`${ROOT_URL}/posts`)
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
    axios.get(`${ROOT_URL}/posts/${id}/`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        console.log(error);
      });
  };
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
