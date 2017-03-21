import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router';
import gridItemUtils from './utils/gridItemUtils'
import './styles/common.css';

export default class ComicGridItem extends Component {
	render() {
		let title, description;
		if (this.props.inGrid) {
			title = <Link key={this.props.id} to={`/comics/${this.props.id}`}><strong>{this.props.title}</strong></Link>;
			description = <em>{gridItemUtils.truncateDescription(this.props.description)}</em>
		} else {
			title = <strong>{this.props.title}</strong>
			description = <em>{this.props.description}</em>
		}

		return (
			<div className="gridItem comicGridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				{title}<br/>
				{description}<br/>
				<a href={this.props.details}>Official Marvel Website</a><br/>
				Page Count: {this.props.pageCount}<br/>
				# Creators: {this.props.numCreators}<br/>
				# Characters: {this.props.numCharacters}
			</div>
		);
	}
}