import React, { Component } from 'react';
import LinkedGrid from './cards/LinkedGrid';
import CreatorGridItem from '../gridContainer/griditems/Creator';
import dataService from '../../utils/dataService';

export default class CreatorDetails extends Component {
	constructor(props) {
		super(props);
		let state = {};

		let creator = dataService.getCreators([parseInt(props.params.id, 10)]);
		if (creator !== undefined && creator.length > 0) {
			creator = creator[0];

			state = {
				creator: creator,
				comics: dataService.getComics(creator.comics),
				series: dataService.getSeries(creator.series)
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
				<CreatorGridItem {...this.state.creator} />
				<LinkedGrid linkType="Comics" displayField="title" data={this.state.comics} />
				<LinkedGrid linkType="Series" displayField="title" data={this.state.series} />
			</div>
		);
	}
}
