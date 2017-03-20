import React, { Component } from 'react';
import LinkedSeries from './cards/LinkedSeries';
import LinkedGrid from './cards/LinkedGrid';
import ComicGridItem from '../gridContainer/griditems/Comic';
import dataService from '../../utils/dataService';

export default class ComicDetails extends Component {
	constructor(props) {
		super(props);
		let state = {};

		let comic = dataService.getComics([parseInt(props.params.id, 10)]);
		if (comic !== undefined && comic.length > 0) {
			comic = comic[0];

			state = {
				comic: comic,
				characters: dataService.getCharacters(comic.characters),
				creators: dataService.getCreators(comic.creators)
			};

			let series = dataService.getSeries([state.comic.series]);
			if (series !== undefined && series.length > 0) state.series = series[0];
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
				<ComicGridItem {...this.state.comic} />
				<LinkedSeries series={this.state.series} />
				<LinkedGrid linkType="Characters" displayField="name" data={this.state.characters} />
				<LinkedGrid linkType="Creators" displayField="fullName" data={this.state.creators} />
			</div>
		);
	}
}
