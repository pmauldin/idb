import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridContainer from '../gridContainer/GridContainer';
import ComicGridItem from '../gridContainer/griditems/ComicGridItem';
import CreatorGridItem from '../gridContainer/griditems/CreatorGridItem';
import CharacterGridItem from '../gridContainer/griditems/CharacterGridItem';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
import Toolbar from './menus/Toolbar';
import sortFields from './menus/sorting/SortingFields';
import filterFields from './menus/filtering/FilteringFields';
import { CHANGE_SORT_FIELD, CHANGE_SORT_ORDER, FILTER_BY_NAME, DATA_LOADED, RESET_STATE } from '../../redux/actions';
import dataService from '../../utils/dataService';

class ResultsContainer extends Component {
	constructor(props) {
		super(props);
		switch (this.props.resultsType) {
			case "comics":
				this.state = {GridItem: ComicGridItem, sortingFields: sortFields.ComicFields, filteringFields: filterFields.comics };
				break;
			case "creators":
				this.state = {GridItem: CreatorGridItem, sortingFields: sortFields.CreatorFields, filteringFields: filterFields.creators};
				break;
			case "characters":
				this.state = {GridItem: CharacterGridItem, sortingFields: sortFields.CharacterFields, filteringFields: filterFields.characters};
				break;
			case "series":
				this.state = {GridItem: SeriesGridItem, sortingFields: sortFields.SeriesFields, filteringFields: filterFields.series};
				break;
			default:
				console.error(`Given type ${this.props.resultsType} is invalid.`);
				break;
		}

		this.props.resetState();
		this.props.toggleSortField(this.state.sortingFields[0].fieldName);
		dataService.getData(this.props.resultsType)
			.then(data => {
				this.props.dataLoaded(data, this.props.resultsType);
			})
			.catch(error => {
				console.error(error);
			});
	}

	render() {
		return (
			<div>
				<Toolbar {...this.props} sortingFields={this.state.sortingFields} filteringFields={this.state.filteringFields} />
				<GridContainer {...this.props} data={this.props.data[this.props.resultsType]} filteringFields={this.state.filteringFields} gridItem={this.state.GridItem} />
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		data: store.data,
		sortData: store.sort,
		filterData: store.filter
	};
}

function mapDispatchToProps(dispatch) {
	return {
		toggleSortField: (value) => dispatch({ type: CHANGE_SORT_FIELD, field: value }),
		toggleSortOrder: (value) => dispatch({ type: CHANGE_SORT_ORDER, order: value }),
		filterByName: (value) => dispatch({ type: FILTER_BY_NAME, value }),
		dataLoaded: (data, resultsType) => dispatch({ type: DATA_LOADED, data, resultsType }),
		resetState: () => dispatch({ type: RESET_STATE })
	};
}

ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);

export default ResultsContainer;
