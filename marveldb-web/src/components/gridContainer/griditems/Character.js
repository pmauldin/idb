import React, { Component } from 'react';
import './styles/common.css';

export default class Character extends Component {
	render() {
		return (
			<div className="gridItem">
				Name: {this.props.name}<br/>
				Description: {(this.props.description || 'None').slice(0, 140)}<br/> {/*if too long, add ellipsis */}
				# Comic Appearances: {this.props.numComicAppearances}<br/>
				# Of Series Appearances: {this.props.numSeriesAppearances}<br/>
				<a href={this.props.wiki}>Wiki</a>
			</div>
		);
	}
}