import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import dataService from '../../utils/dataService';
import { Image } from 'react-bootstrap';
import loadingSpinner from '../../../assets/ring-alt.gif';
import SearchGridContainer from '../gridContainer/SearchGridContainer';
import PaginationBar from './menus/PaginationBar';
import { PAGINATION_UPDATED, RESET_STATE, UPDATE_SEARCH_OPTIONS } from '../../redux/actions';


// TODO: Searching from Details Page is broken
// TODO: For some reason, SearchResultsContainer always sees searchText from 1 search ago, if multiple searches are initiated

class SearchResultsContainer extends Component {
	componentWillMount() {
		this.state = {
			dataLoading: true
		}

		this.loadData({
			searchTerm: JSON.stringify(this.props.search.searchText),
			pagination: this.props.pagination
		});
	}

	componentWillReceiveProps(nextProps) {
		let shouldReload = !isEqual(this.props.pagination, nextProps.pagination);

		if (!isEqual(this.props.search.searchText, nextProps.search.searchText)) {
			shouldReload = true;
			nextProps.pagination.page = 0;
		}

		if (shouldReload) {
			this.loadData({
				searchTerm: JSON.stringify(this.props.search.searchText),
				pagination: this.props.pagination
			});
		}
	}

	loadData(requestOptions) {
		dataService.getData('search', requestOptions)
			.then(data => {
				let count = 0;
				let resultsTypes = Object.keys(data);
				resultsTypes.forEach(resultsType => {
					if (data[resultsType].count) {
						count += data[resultsType].count
					}
				});

				this.setState({ count, dataLoading: false, data });
				
				// TODO: This should work instead of keeping data on the state
				// this.props.dataLoaded(data, 'search')
			})
			.catch(error => {
				console.error(error);
			});
	}

	render() {
		if (this.state.dataLoading) {
			return <Image className="loadingSpinner" responsive src={loadingSpinner} />;
		} else {
			return (
				<div>
					<PaginationBar count={this.state.count} {...this.props} />
					<SearchGridContainer data={this.state.data}/>
				</div>
			);
		}
	}
}

function mapStateToProps(store) {
	return {
		// data: store.data,
		pagination: store.pagination,
		search: store.search
	};
}

function mapDispatchToProps(dispatch) {
	return {
		paginationUpdated: (value) => dispatch({type: PAGINATION_UPDATED, value}),
		// dataLoaded: (data, resultsType) => dispatch({ type: DATA_LOADED, data, resultsType }),
		searchOptionsUpdated: (value) => dispatch({type: UPDATE_SEARCH_OPTIONS, value}),
		resetState: () => dispatch({ type: RESET_STATE })
	};
}

SearchResultsContainer = connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);

export default SearchResultsContainer;

