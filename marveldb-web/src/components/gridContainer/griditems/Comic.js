import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import gridItemUtils from './utils/gridItemUtils'
import './styles/common.css';

export default class Comic extends Component {
	render() {
		return (
			<div className="gridItem comicGridItem">
				<Image responsive className="gridThumbnail" src={this.props.thumbnail}/>
				<strong>{this.props.title}</strong><br/>
				<em>{gridItemUtils.truncateDescription(this.props.description)}</em><br/>
				<p>
					Issue #{this.props.issueNumber}<br/>
					Page Count: {this.props.pageCount}<br/>
					# Creators: {this.props.numCreators}<br/>
					# Characters: {this.props.numCharacters}
				</p>
			</div>
		);
	}
}