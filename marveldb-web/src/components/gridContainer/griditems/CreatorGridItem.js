import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image } from 'react-bootstrap';
import './styles/common.css';

export default class CreatorGridItem extends Component {
	render() {
		let fullName;
		if (this.props.inGrid) {
			fullName = <Link key={this.props.id} to={`/creators/${this.props.id}`}><strong>{this.props.fullName}</strong></Link>;
		} else {
			fullName = <strong>{this.props.fullName}</strong>
		}

		return (
			<div className="gridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				{fullName}<br/>
				<a href={this.props.details}>Official Marvel Website</a><br/>
				# Comics: {this.props.numComics}<br/>
				# Series: {this.props.numSeries}
			</div>
		);
	}
}