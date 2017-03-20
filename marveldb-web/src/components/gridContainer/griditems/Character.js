import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import gridItemUtils from './utils/gridItemUtils'
import './styles/common.css';

export default class Character extends Component {
	render() {
		return (
			<div className="gridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				<strong>{this.props.name}</strong><br/>
				<em>{gridItemUtils.truncateDescription(this.props.description)}</em><br/>
				# Comic Appearances: {this.props.numComicAppearances}<br/>
				# Of Series Appearances: {this.props.numSeriesAppearances}<br/>
				<a href={this.props.wiki}>Wiki</a>
			</div>
		);
	}
}