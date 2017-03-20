import React, { Component } from 'react';
import './styles/common.css';

export default class Comic extends Component {
	render() {
		return (
			<div className="gridItem">
				Title: {this.props.title}<br/>
				Description: {(this.props.description || 'None').slice(0, 140)}<br/> {/*if too long, add ellipsis */}
				Issue #{this.props.issueNumber}<br/>
				Page Count: {this.props.pageCount}<br/>
				# Creators: {this.props.numCreators}<br/>
				# Characters: {this.props.numCharacters}
			</div>
		);
	}
}