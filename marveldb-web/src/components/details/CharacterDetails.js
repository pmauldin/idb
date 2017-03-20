import React, { Component } from 'react';
import LinkedGrid from './cards/LinkedGrid';
import CharacterGridItem from '../gridContainer/griditems/Character';
import dataService from '../../utils/dataService';

export default class CharacterDetails extends Component {
	constructor(props) {
		super(props);
		let state = {};

		let character = dataService.getCharacters([parseInt(props.params.id, 10)]);
		if (character !== undefined && character.length > 0) {
			character = character[0];

			state = {
				character: character,
				comics: dataService.getComics(character.comicAppearances),
				series: dataService.getSeries(character.seriesAppearances)
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
					404 Character Not Found
				</div>
			);
		}

		return (
			<div>
				<CharacterGridItem {...this.state.character} />
				<LinkedGrid linkType="Comics" displayField="title" data={this.state.comics} />
				<LinkedGrid linkType="Series" displayField="title" data={this.state.series} />
			</div>
		);
	}
}
