import React, { Component } from 'react';
import './styles/common.css';

export default class Creator extends Component {
	render() {
		return (
			<div className="gridItem">
				Name: {this.props.fullName}<br/>
				<a href={this.props.details}>Details</a><br/>
				# Comics: {this.props.numComics}<br/>
				# Series: {this.props.numSeries}
			</div>
		);
	}
}