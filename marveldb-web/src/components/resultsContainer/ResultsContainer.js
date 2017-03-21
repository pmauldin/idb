import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridContainer from '../gridContainer/GridContainer';
import ComicGridItem from '../gridContainer/griditems/ComicGridItem';
import CreatorGridItem from '../gridContainer/griditems/CreatorGridItem';
import CharacterGridItem from '../gridContainer/griditems/CharacterGridItem';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
import Toolbar from './menus/Toolbar';
import fields from './menus/SortingFields';
import { CHANGE_SORT_FIELD, CHANGE_SORT_ORDER, LOAD_DATA } from '../../redux/actions';

class ResultsContainer extends Component {
	constructor(props) {
		super(props);
		switch (this.props.resultsType) {
			case "comics":
				this.state = {'GridItem': ComicGridItem, 'SortingFields': fields.ComicFields};
				break;
			case "creators":
				this.state = {'GridItem': CreatorGridItem, 'SortingFields': fields.CreatorFields};
				break;
			case "characters":
				this.state = {'GridItem': CharacterGridItem, 'SortingFields': fields.CharacterFields};
				break;
			case "series":
				this.state = {'GridItem': SeriesGridItem, 'SortingFields': fields.SeriesFields};
				break;
			default:
				console.error(`Given type ${this.props.resultsType} is invalid.`);
				break;
		}

		this.props.toggleSortField(this.state.SortingFields[0].fieldName);
		this.props.loadData(this.props.resultsType);
	}

	render() {
		return (
			<div>
				<Toolbar {...this.props} sortingFields={this.state.SortingFields} />
				<GridContainer sortData={this.props.sortData} data={this.props.data[this.props.resultsType]} gridItem={this.state.GridItem} />
			</div>
		);
	}
}

function mapStateToProps(store) {
	return {
		data: store.data,
		sortData: store.sort
	};
}

function mapDispatchToProps(dispatch) {
	return {
		toggleSortField: (value) => dispatch({ type: CHANGE_SORT_FIELD, field: value }),
		toggleSortOrder: (value) => dispatch({ type: CHANGE_SORT_ORDER, order: value }),
		loadData: (resultsType, ids) => dispatch({ type: LOAD_DATA, resultsType, ids })
	};
}

ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);

export default ResultsContainer;
