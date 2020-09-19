import React from 'react';

export default class Deletecomment extends React.Component {
  removeComment(id) {
    this.props.removeComment(id);
  }
  render() {
    return (
      <div className='comments'>
        <div className="username">Username</div> {/*only allow first name*/}
        <div style={{marginLeft: 6}}>{this.props.comment.comment}</div>
        <div style={{marginLeft:'auto'}}>
          <button 
            style={{ marginLeft: 'auto', borderRadius: 20 }} 
            onClick={() => this.removeComment(this.props.id)}
          >
            Remove
          </button>
        </div>
      </div>
    )
  }
}