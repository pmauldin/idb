import { combineReducers } from 'redux';
import { CHANGE_SORT_FIELD, CHANGE_SORT_ORDER, FILTER_BY_NAME, DATA_LOADED, RESET_STATE } from './actions';

function data(state, action) {
	if (!state) {
		return {comics: [], creators: [], characters: [], series: []};
	}

	switch (action.type) {
		case DATA_LOADED:
			let resultsType = action.resultsType;
			let data = {...state};
			data[resultsType] = action.data;
			return {...state, ...data};
		default:
			return state;
	}
}

function sort(state, action) {
	if (!state) {
		return { order: "ascending" };
	}

	switch (action.type) {
		case CHANGE_SORT_FIELD:
			return { ...state, field: action.field };
		case CHANGE_SORT_ORDER:
			return { ...state, order: action.order };
		default:
			return state;
	}
}

function filter(state, action) {
	if (!state) {
		return {};
	}

	switch (action.type) {
		case FILTER_BY_NAME:
			return { ...state, value: action.value };
		case RESET_STATE:
			return {};
		default:
			return state;
	}
}


export default combineReducers({ data, sort, filter });
