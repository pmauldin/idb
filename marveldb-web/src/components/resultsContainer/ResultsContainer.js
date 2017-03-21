import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridContainer from '../gridContainer/GridContainer';
import ComicGridItem from '../gridContainer/griditems/ComicGridItem';
import CreatorGridItem from '../gridContainer/griditems/CreatorGridItem';
import CharacterGridItem from '../gridContainer/griditems/CharacterGridItem';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
import SortingMenu from './menus/SortingMenu';
import fields from './menus/SortingFields';
import dataService from '../../utils/dataService';
import { CHANGE_SORT_FIELD, CHANGE_SORT_ORDER, LOAD_DATA } from '../../redux/actions';

class ResultsContainer extends Component {
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

		this.props.toggleSortField(this.state.SortingFields[0]);
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
				<SortingMenu {...this.props} sortingFields={this.state.SortingFields} />
				<GridContainer results={this.getResults(this.props.resultsType)()} gridItem={this.state.GridItem} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		text: state.text
	};
}

function mapDispatchToProps(dispatch) {
	return {
		toggleSortField: (value) => dispatch({ type: CHANGE_SORT_FIELD, order: value }),
		toggleSortOrder: (value) => dispatch({ type: CHANGE_SORT_ORDER, field: value })
	};
}

ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);

export default ResultsContainer;
