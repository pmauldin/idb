import { combineReducers } from 'redux';
import map from 'lodash/map';
import clone from 'lodash/clone';
import { UPDATE_FILTER_OPTIONS, UPDATE_SORT_OPTIONS, UPDATE_SEARCH_OPTIONS, PAGINATION_UPDATED, DATA_LOADED, RESET_STATE } from './actions';

function data(state, action) {
	if (!state) {
		return {comics: null, creators: null, characters: null, series: null, search: null};
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
			return { ...state, filters: map(action.value, clone)};
		case RESET_STATE:
			return {};
		default:
			return state;
	}
}

function search(state, action) {
	if (!state) {
		return {searchText: ""};
	}

	switch (action.type) {
		case UPDATE_SEARCH_OPTIONS:
			return { ...state, ...action.value};
		case RESET_STATE:
			return {};
		default:
			return state;
	}
}

function pagination(state, action) {
	if (!state) {
		return { page: 0, pageSize: 20 };
	}

	switch (action.type) {
		case PAGINATION_UPDATED:
			return { ...state, ...action.value};
		default:
			return state;
	}
}


export default combineReducers({ data, sort, filter, search, pagination });
