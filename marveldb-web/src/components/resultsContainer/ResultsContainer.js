import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResultsContainer from './SearchResultsContainer';
import GridResultsContainer from './GridResultsContainer';
import { UPDATE_SEARCH_OPTIONS } from '../../redux/actions';

class ResultsContainer extends Component {
	render() {
		const {search, ...otherProps} = this.props; 
		let ResultsComponent = (search.searchText && search.searchText.trim().length > 0) ? SearchResultsContainer : GridResultsContainer;
		return <ResultsComponent {...otherProps} />;
	}
}

function mapStateToProps(store) {
	return {
		search: store.search
	};
}

function mapDispatchToProps(dispatch) {
	return {
		searchOptionsUpdated: (value) => dispatch({type: UPDATE_SEARCH_OPTIONS, value})
	};
}

ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);

export default ResultsContainer;
