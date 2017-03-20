import React, { Component } from 'react';
import './styles/common.css';

export default class LinkedSeries extends Component {
	render() {
		let html;

		if (this.props.series) {
			html = (
				<div className="linkedSeriesCard">
					{this.props.series.title || 'Not a part of a series.'}
				</div>
			);
		} else {
			html = (
				<div>
					This Comic is not a part of any series.
				</div>
			)
		}

		return html;
	}
}
