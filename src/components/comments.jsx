import React, { Component } from 'react';

export default class Comments extends Component {
	constructor(props) {
		super(props)
		this.state = {
      comment: ''
    };
	}
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
          style={{padding: 10, borderRadius:20}}
        />
        <button style={{marginLeft: 6, borderRadius:20}} onClick={() => this.addComment(this.state.comment)}>
          Add
        </button>
      </div>
    );
	}
}