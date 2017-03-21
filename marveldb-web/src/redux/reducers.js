import { combineReducers } from 'redux';
import { CHANGE_SORT_FIELD, CHANGE_SORT_ORDER, LOAD_DATA } from './actions';

function data(state, action) {
	if (!state) {
		return {};
	}

	switch (action.type) {
		case LOAD_DATA:
			return { ...state, data: action.data };
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
			return { ...state, order: state.field };
		case CHANGE_SORT_ORDER:
			return { ...state, field: state.order }; // TODO Do the sorting
		default:
			return state;
	}

}


export default combineReducers({ data, sort });
