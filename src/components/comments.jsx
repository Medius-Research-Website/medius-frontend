import React, { Component } from 'react';

export default class Comments extends Component {
  state = {
    comment: ''
  };
	handleChange = e => {
		this.setState( { comment: e.target.value } )
	}
	addComment = comment => {
    if (comment.length > 0) {
      this.props.addComment(comment);
      this.setState({ comment: '' });
    }
	}
	render() {
    return (
      <div>
        <input
          className="input"
          type="text" 
          value={this.state.comment} 
          onChange={this.handleChange}
          placeholder="Add a comment..."
          style={{padding: 20,borderRadius:20, backgroundColor:'#E0E1DD',border:'none'}}
        />
        <button 
          style={{backgroundColor:'#5A786F',color:'white',
                  marginLeft:10,borderRadius:20}} 
          onClick={() => this.addComment(this.state.comment)}>
            Add
        </button>
      </div>
    );
	}
}