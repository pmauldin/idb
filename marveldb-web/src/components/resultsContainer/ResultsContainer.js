import React, { Component } from 'react';
import GridContainer from '../gridContainer/GridContainer';
import ComicGridItem from '../gridContainer/griditems/Comic';
import CreatorGridItem from '../gridContainer/griditems/Creator';
import CharacterGridItem from '../gridContainer/griditems/Character';
import SeriesGridItem from '../gridContainer/griditems/Series';
import SortingMenu from './menus/SortingMenu';
import fields from './menus/SortingFields';
import dataService from '../../utils/dataService';

export default class ResultsContainer extends Component {
	constructor(props) {
		super(props);
		switch (this.props.resultsType) {
			case "comic":
				this.state = {'GridItem': ComicGridItem, 'SortingFields': fields.ComicFields};
				break;
			case "creator":
				this.state = {'GridItem': CreatorGridItem, 'SortingFields': fields.CreatorFields};
				break;
			case "character":
				this.state = {'GridItem': CharacterGridItem, 'SortingFields': fields.CharacterFields};
				break;
			case "series":
				this.state = {'GridItem': SeriesGridItem, 'SortingFields': fields.SeriesFields};
				break;
			default:
				console.error(`Given type ${this.props.resultsType} is invalid.`);
				break;
		}
	}

	// TODO: When we switch to Redux, this data will be populated via props/reducers
	getResults(resultsType) {
		switch (resultsType) {
			case "comic":
				return dataService.getComics;
			case "creator":
				return dataService.getCreators;
			case "character":
				return dataService.getCharacters;
			case "series":
				return dataService.getSeries;
			default:
				console.error(`Given type ${this.props.resultsType} is invalid.`);
				break;
		}
	}

	render() {
		return (
			<div>
				<SortingMenu sortingFields={this.state.SortingFields} />
				<GridContainer results={this.getResults(this.props.resultsType)()} gridItem={this.state.GridItem} />
			</div>
		);
	}
}
