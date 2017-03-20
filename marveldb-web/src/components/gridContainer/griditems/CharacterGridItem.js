import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router';
import gridItemUtils from './utils/gridItemUtils'
import './styles/common.css';

export default class CharacterGridItem extends Component {
	render() {
		let name;
		if (this.props.inGrid) {
			name = <Link key={this.props.id} to={`/characters/${this.props.id}`}><strong>{this.props.name}</strong></Link>;
		} else {
			name = <strong>{this.props.name}</strong>
		}

		return (
			<div className="gridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				{name}<br/>
				<em>{gridItemUtils.truncateDescription(this.props.description)}</em><br/>
				# Comic Appearances: {this.props.numComicAppearances}<br/>
				# Of Series Appearances: {this.props.numSeriesAppearances}<br/>
				<a href={this.props.wiki}>Wiki</a>
			</div>
		);
	}
}