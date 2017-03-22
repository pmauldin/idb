import React, { Component } from 'react';
import './styles/common.css';

export default class LinkedSeries extends Component {
	render() {
		let html;

		if (this.props.series && this.props.series.length > 0) {
			// TODO Link to Series
			html = (
				<div className="linkedSeriesCard">
					{this.props.series[0].title}
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
