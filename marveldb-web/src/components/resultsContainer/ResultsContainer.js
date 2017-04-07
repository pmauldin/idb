import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import GridContainer from '../gridContainer/GridContainer';
import ComicGridItem from '../gridContainer/griditems/ComicGridItem';
import CreatorGridItem from '../gridContainer/griditems/CreatorGridItem';
import CharacterGridItem from '../gridContainer/griditems/CharacterGridItem';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
import Toolbar from './menus/Toolbar';
import sortFields from './menus/sorting/SortingFields';
import filterFields from './menus/filtering/FilteringFields';
import { UPDATE_FILTER_OPTIONS, UPDATE_SORT_OPTIONS, DATA_LOADED, PAGINATION_UPDATED, RESET_STATE } from '../../redux/actions';
import dataService from '../../utils/dataService';

class ResultsContainer extends Component {
	constructor(props) {
		super(props);
		let state = {};
		switch (this.props.resultsType) {
			case "comics":
				state = {GridItem: ComicGridItem, sortingFields: sortFields.ComicFields, filters: filterFields.ComicFilters };
				break;
			case "creators":
				state = {GridItem: CreatorGridItem, sortingFields: sortFields.CreatorFields, filters: filterFields.CreatorFilters};
				break;
			case "characters":
				state = {GridItem: CharacterGridItem, sortingFields: sortFields.CharacterFields, filters: filterFields.CharacterFilters};
				break;
			case "series":
				state = {GridItem: SeriesGridItem, sortingFields: sortFields.SeriesFields, filters: filterFields.SeriesFilters};
				break;
			default:
				console.error(`Given type ${this.props.resultsType} is invalid.`);
				break;
		}

		dataService.getCount(this.props.resultsType)
			.then(count => {
				this.setState({ count });
			})
			.catch(error => console.error(error));

		state.dataLoading = true;

		this.state = state;
		this.props.resetState();
		this.props.sortOptionsUpdated({field: this.state.sortingFields[0].fieldName, order: 'asc'});
		// this.loadData({ sortOptions:});
	}

	componentWillReceiveProps(nextProps) {
		let shouldReload = !isEqual(this.props.pagination, nextProps.pagination);

		if (!(isEqual(this.props.sortOptions, nextProps.sortOptions) &&
			isEqual(this.props.filterOptions.filters, nextProps.filterOptions.filters))) {
			shouldReload = true;
			nextProps.pagination.page = 0;
		}

		if (shouldReload) {
			this.setState({ dataLoading: true });
			this.loadData({
				sortOptions: nextProps.sortOptions,
				filters: nextProps.filterOptions.filters,
				pagination: nextProps.pagination
			});
		}
	}

	render() {
		return (
			<div>
				<Toolbar {...this.props} count={this.state.count} sortingFields={this.state.sortingFields} filters={this.state.filters} />
				<GridContainer data={this.props.data[this.props.resultsType]} dataLoading={this.state.dataLoading} gridItem={this.state.GridItem} />
			</div>
		);
	}

	loadData(requestOptions) {
		dataService.getData(this.props.resultsType, requestOptions)
			.then(data => {
				this.setState({ dataLoading: false });
				if (data.count) {
					// this.props.paginationUpdated({ ...this.props.pagination, page: 0 });
					this.setState({ count: data.count });
					this.props.dataLoaded(data.data, this.props.resultsType);
				} else {
					this.props.dataLoaded(data, this.props.resultsType);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
}


function mapStateToProps(store) {
	return {
		data: store.data,
		sortOptions: store.sort,
		filterOptions: store.filter,
		pagination: store.pagination
	};
}

function mapDispatchToProps(dispatch) {
	return {
		sortOptionsUpdated: (value) => dispatch({type: UPDATE_SORT_OPTIONS, value}),
		filtersUpdated: (value) => dispatch({type: UPDATE_FILTER_OPTIONS, value}),
		paginationUpdated: (value) => dispatch({type: PAGINATION_UPDATED, value}),
		dataLoaded: (data, resultsType) => dispatch({ type: DATA_LOADED, data, resultsType }),
		resetState: () => dispatch({ type: RESET_STATE })
	};
}

ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);

export default ResultsContainer;
