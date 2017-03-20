import React, { Component } from 'react';
import LinkedGrid from './cards/LinkedGrid';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
import dataService from '../../utils/dataService';

export default class SeriesDetails extends Component {
	constructor(props) {
		super(props);
		let state = {};

		let series = dataService.getSeries([parseInt(props.params.id, 10)]);
		if (series !== undefined && series.length > 0) {
			series = series[0];

			state = {
				series: series,
				comics: dataService.getComics(series.comics),
				characters: dataService.getCharacters(series.characters),
				creators: dataService.getCreators(series.creators)
			};
		} else {
			state = { notFound: true };
		}

		this.state = state;
	}

	render() {

		if (this.state.notFound) {
			// TODO Use NotFoundComponent
			return (
				<div>
					404 Comic Not Found
				</div>
			);
		}
		return (
			<div>
				<SeriesGridItem inGrid={false} {...this.state.series} />
				<LinkedGrid linkType="Comics" displayField="title" data={this.state.comics} />
				<LinkedGrid linkType="Characters" displayField="name" data={this.state.characters} />
				<LinkedGrid linkType="Creators" displayField="fullName" data={this.state.creators} />
			</div>
		);

	}
}
