import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './styles/common.css';

export default class Creator extends Component {
	render() {
		return (
			<div className="gridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				<strong>{this.props.fullName}</strong><br/>
				<a href={this.props.details}>Details</a><br/>
				# Comics: {this.props.numComics}<br/>
				# Series: {this.props.numSeries}
			</div>
		);
	}
}