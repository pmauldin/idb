import React, { Component } from 'react';
import { connect } from 'react-redux';
import SortingMenu from './SortingMenu';

class Toolbar extends Component {

	render() {
		return (
			<SortingMenu {...this.props} />
		);
	}
}

// function mapStateToProps(store) {
// 	return {
// 		data: store.data
// 	};
// }
//
// function mapDispatchToProps(dispatch) {
// 	return {
// 		toggleSortField: (value) => dispatch({ type: CHANGE_SORT_FIELD, order: value }),
// 		toggleSortOrder: (value) => dispatch({ type: CHANGE_SORT_ORDER, field: value }),
// 		loadData: (resultsType, ids) => dispatch({ type: LOAD_DATA, resultsType, ids })
// 	};
// }

Toolbar = connect()(Toolbar);

export default Toolbar;
