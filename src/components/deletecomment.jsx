import React from 'react';

export default class Deletecomment extends React.Component {
  removeComment(id) {
    this.props.removeComment(id);
  }
  render() {
    return (
      <div className='comments'>
        <div className="username">Username</div> 
        <div style={{marginLeft: 6}}>{this.props.comment.comment}</div>
        <button 
          style={{ marginLeft: 'auto' }} 
          onClick={() => this.removeComment(this.props.id)}
        >
            Remove
        </button>
      </div>
    )
  }
}