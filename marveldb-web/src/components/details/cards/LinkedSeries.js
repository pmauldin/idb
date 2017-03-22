import React, { Component } from 'react';
import { Link } from 'react-router';
import '../styles/common.css';

export default class LinkedSeries extends Component {
	render() {
		let html;

		if (this.props.series && this.props.series.length > 0) {
			html = (
				<div className="linkedSeriesCard">
					This comic is a part of <Link to={`/series/${this.props.series[0].id}`} >{this.props.series[0].title}</Link>
				</div>
			);
		} else {
			html = (
				<div className="linkedSeriesCard">
					This comic is not a part of any series.
				</div>
			)
		}

		return html;
	}
}
