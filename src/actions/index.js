import axios from 'axios';
import history from '../history'
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://medius-api.herokuapp.com/api';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  FETCH_CURRENT_USER: 'FETCH_CURRENT_USER',
  FETCH_COMMENT:'FETCH_COMMENT',
  FETCH_PRICE_CHANGE:'FETCH_PRICE_CHANGE',
  FETCH_USER_POSTS: 'FETCH_USER_POSTS',
  AUTH_USER: 'AUTH_USER',
  TOGGLE_NEW_POST_MODAL: 'TOGGLE_NEW_POST_MODAL',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  CLEAR: 'CLEAR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EXISTING_USER: 'EXISTING_USER',
  INCOMPLETE_FORM: 'INCOMPLETE_FORM',
  SINGLE_PRICE_CHANGE: 'SINGLE_PRICE_CHANGE',
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_POST: 'ADD_POST',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

const setError = (dispatch, message) => {
    dispatch({type: ActionTypes.SET_ERROR, payload:message});
}
export const clearErrorMessages = ()=>{
  return (dispatch)=>{
    dispatch({type: ActionTypes.CLEAR_ERROR});
  }
}
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
export function signinUser(user, history, callback?) {
  // console.log('pushing sign in user');
    return (dispatch) => {
      axios.post(`${ROOT_URL}/signin`, user)
        .then((response) => {
          dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.user });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userID', response.data.user.id);
          localStorage.setItem('username', response.data.user.username);
          history.push('/landingpage');
          if (callback) callback();
        })
        .catch((error) => {
          // console.log("error sign in");
          
          if(user.email && user.password) {
            dispatch({ type: ActionTypes.INVALID_CREDENTIALS })
          } else {
            dispatch({ type: ActionTypes.INCOMPLETE_FORM})
          }
          if (callback) callback();
        });
    };
  }
  
  export function signupUser(user, history) {
    return (dispatch) => {
      axios.post(`${ROOT_URL}/signup`, user)
        .then((response) => {
          // console.log("successfully signed up user");
          dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.user });
          // console.log(response.data.user.id)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userID', response.data.user.id);
          localStorage.setItem('username', response.data.user.username);
          history.push('/landingpage');
        })
        .catch((error) => {
          console.log(error);
          if(error.response.status === 500){
            console.log('error 500, user already exists!', + error)
            dispatch({ type: ActionTypes.EXISTING_USER });
          } 
          if(error.response.status === 422) {
            console.log('error 422, must fill out the form!', + error)
            dispatch({ type: ActionTypes.INCOMPLETE_FORM});
          }
        });
    };
  }
  
  // deletes token from localstorage and deauths
  export function signoutUser(history) {
    return (dispatch) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      localStorage.removeItem('username');
      dispatch({ type: ActionTypes.DEAUTH_USER });
      history.push('/');
    };
  }

// returns public information for all users (need to narrow this, how do we want to present profiles?)
export function fetchUsers() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USERS, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,'An error occured when getting users information/');
        console.log(error);
      });
  };
}

// only returns public information for a user
export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${id}/`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,'An error occured when getting the user information.');
        console.log(error);
      });
  };
}

export function fetchCurrentUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${id}/`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        // console.log(response, 'fetch current user action')
        dispatch({ type: ActionTypes.FETCH_CURRENT_USER, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,"An error occured when getting current user's information.");
        console.log(error);
      });
  };
}

// only can update current user
export function updateUser(id, fields) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/user/${id}`, fields, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        console.log('actions', response);
        dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,'An error occured when trying to update user information.');
        console.log(error);
      });
  };
}

export function fetchUserPosts(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/posts/${id}`, { headers: { authorization: localStorage.getItem('token') }})
    .then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER_POSTS, payload: response.data});
    })
    .catch((error) => {
      setError(dispatch,"An error occured when fetching this user's posts.");
      console.log(error);
    })
  }
}
  

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,"An error occured when getting posts' information.");
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
        setError(dispatch,"An error occured when getting the post's information.");
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
        setError(dispatch,"An error occured when getting price change of a post.");
        console.log(error);
      });
  };
}

export function fetchCommentsByPost(postID){
  return (dispatch)=>{
    axios.get(`${ROOT_URL}/posts/comments/${postID}/`,{ headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({type: ActionTypes.FETCH_COMMENT, payload: {...response.data, postID }} )
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,"An error occured when getting the post's comments.");
        console.log(error);
      });
  }
};

export function addComment(comment, postID) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts/comments/${postID}`, comment, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      dispatch({ type: ActionTypes.ADD_COMMENT, payload: {...response.data, postID }});
    })
    .catch((error) => {
      setError(dispatch,"An error occured when adding the comment.");
      console.log(error);
    });
  } 
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => { 
        // console.log(response)
        dispatch({ type: ActionTypes.ADD_POST, payload: response.data });
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,"A error occured when creating the post.");
        console.log(error);
      });
  }
}

export function updatePost(id, post) {
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

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => { history.push('/'); })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,"An error occured when deleting the post");
        console.log(error);
      });
  };
}

export function toggleNewPostModal(){
  return (dispatch)=>{
    dispatch({type:ActionTypes.TOGGLE_NEW_POST_MODAL});
  }
}
export function singlePriceChange(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/ticker/${id}/`, { headers: { authorization: localStorage.getItem('token') }})
      .then((response) => {
        dispatch({ type: ActionTypes.SINGLE_PRICE_CHANGE, payload: response.data});
      })
      .catch((error) => {
        // dispatch an error, in separate error reducer
        setError(dispatch,"An error occured getting price change of a post.");
        console.log(error);
      });
  };
}

export function likePost(postID, userId, stateOfLike){
  return (dispatch)=>{
    if (!stateOfLike){
    axios.put(`${ROOT_URL}/user/posts/likes/${userId}/`,{postID},{ headers: { authorization: localStorage.getItem('token') }})
      .then((response)=>{
        // handle after like or unlike
        console.log(response);
        // dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error)=>{
        // handle Errors
        setError(dispatch,"An error occured liking the post.");
        console.log(error);
      });}
    else{
    axios.put(`${ROOT_URL}/user/posts/unlikes/${userId}/`,{postID},{ headers: { authorization: localStorage.getItem('token') }})
      .then((response)=>{
        // handle after like or unlike
        console.log(response);
        
      })
      .catch((error)=>{
        // handle Errors
        setError(dispatch,"An error occured unliking the post.");
        console.log(error);
      });}
  }
}

export function followUser(myID, theirID){
  return (dispatch)=>{
    axios.patch(`${ROOT_URL}/user/follow/${myID}/`,theirID, { headers: { authorization: localStorage.getItem('token') }})
      .then((response)=>{
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      })
      .catch((error)=>{
        // handle Errors
        setError(dispatch,"An error occured when following the user.");
        console.log(error);
      })
  }
}

export function unfollowUser(myID, theirID){
  return (dispatch)=>{
    axios.patch(`${ROOT_URL}/user/unfollow/${myID}/`,theirID, { headers: { authorization: localStorage.getItem('token') }})
      .then((response)=>{
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
      })
      .catch((error)=>{
        // handle Errors
        setError(dispatch,"An error occured when unfollowing the user.");
        console.log(error);
      })
  }
}
