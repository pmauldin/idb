import { combineReducers } from 'redux';
import { UPDATE_FILTER_OPTIONS, UPDATE_SORT_OPTIONS, DATA_LOADED, RESET_STATE } from './actions';

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
		return { order: "asc" };
	}

	switch (action.type) {
		case UPDATE_SORT_OPTIONS:
			return { ...state, ...action.value};
		default:
			return state;
	}
}

function filter(state, action) {
	if (!state) {
		return {};
	}

	switch (action.type) {
		case UPDATE_FILTER_OPTIONS:
			return { ...state, ...action};
		case RESET_STATE:
			return {};
		default:
			return state;
	}
}


export default combineReducers({ data, sort, filter });
