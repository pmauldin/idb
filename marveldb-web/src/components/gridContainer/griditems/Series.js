import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import gridItemUtils from './utils/gridItemUtils'
import './styles/common.css';

export default class Series extends Component {
	render() {
		return (
			<div className="gridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				<strong>{this.props.title}</strong><br/>
				<em>{gridItemUtils.truncateDescription(this.props.description)}</em><br/>
				Years Running: {gridItemUtils.getYearRange(this.props.startYear, this.props.endYear)}<br/>
				# Of Comics: {this.props.numComics}<br/>
				# Of Characters: {this.props.numCharacters}<br/>
				# Of Creators: {this.props.numCreators}<br/>
			</div>
		);
	}
}