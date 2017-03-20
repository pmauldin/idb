import React, { Component } from 'react';
import './styles/common.css';

export default class Series extends Component {
	render() {
		return (
			<div className="gridItem">
				Series Title: {this.props.title}<br/>
				Description: {(this.props.description || 'None').slice(0, 140)}<br/> {/*if too long, add ellipsis */}
				Years Running: {this.props.startYear + ' - ' + this.props.endYear}<br/> {/*if endYear >= 2099 display "Present" for end year */}
				# Of Comics: {this.props.numComics}<br/>
				# Of Characters: {this.props.numCharacters}<br/>
				# Of Creators: {this.props.numCreators}<br/>
			</div>
		);
	}
}