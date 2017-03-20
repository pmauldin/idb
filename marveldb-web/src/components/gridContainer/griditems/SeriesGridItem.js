import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router';
import gridItemUtils from './utils/gridItemUtils'
import './styles/common.css';

export default class SeriesGridItem extends Component {
	render() {
		let title;
		if (this.props.inGrid) {
			title = <Link key={this.props.id} to={`/series/${this.props.id}`}><strong>{this.props.title}</strong></Link>;
		} else {
			title = <strong>{this.props.title}</strong>
		}

		return (
			<div className="gridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				{title}<br/>
				<em>{gridItemUtils.truncateDescription(this.props.description)}</em><br/>
				Years Running: {gridItemUtils.getYearRange(this.props.startYear, this.props.endYear)}<br/>
				# Of Comics: {this.props.numComics}<br/>
				# Of Characters: {this.props.numCharacters}<br/>
				# Of Creators: {this.props.numCreators}<br/>
			</div>
		);
	}
}