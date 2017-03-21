import { combineReducers } from 'redux';
import { CHANGE_SORT_FIELD, CHANGE_SORT_ORDER, LOAD_DATA, LOAD_DETAILS } from './actions';
import dataService from '../utils/dataService';

function loadData(resultsType, ids) {
	switch (resultsType) {
		case "characters":
			return dataService.getCharacters(ids);
		case "comics":
			return dataService.getComics(ids);
		case "creators":
			return dataService.getCreators(ids);
		case "series":
			return dataService.getSeries(ids);
		default:
			console.error(`Given type ${resultsType} is invalid.`);
			break;
	}
}

function loadDetails(resultsType, id) {
	var details, series;

	switch (resultsType) {
		case "characters": 
			details = {characters: dataService.getCharacters([id])};
			if (details.characters.length === 0) {
				return {};
			}

			let character = details.characters[0];
			details.comics = dataService.getComics(character.comicAppearances);
			details.series = dataService.getSeries(character.seriesAppearances);
			return details;

		case "comics":
			details = {comics: dataService.getComics([id])};
			if (details.comics.length === 0) {
				return {};
			}

			let comic = details.comics[0];
			details.characters = dataService.getCharacters(comic.characters);
			details.creators = dataService.getCreators(comic.creators);

			series = dataService.getSeries([comic.series]);
			if (series !== undefined && series.length > 0) details.series = series[0];
			return details;

		case "creators":
			details = {creators: dataService.getCreators([id])};
			if (details.creators.length === 0) {
				return {};
			}

			var creator = details.creators[0];
			details.comics = dataService.getComics(creator.comics);
			details.series = dataService.getSeries(creator.series);
			return details;

		case "series":
			details = {series: dataService.getSeries([id])};
			if (details.series.length === 0) {
				return {};
			}

			series = details.series[0];
			details.comics = dataService.getComics(series.comics);
			details.characters = dataService.getCharacters(series.characters);
			details.creators = dataService.getCreators(series.creators);
			return details;

		default:
			console.error(`Given type ${resultsType} is invalid.`);
			break;
	}
}

function data(state, action) {
	if (!state) {
		return {comics: [], creators: [], characters: [], series: []};
	}

	switch (action.type) {
		case LOAD_DATA:
			let resultsType = action.resultsType;
			let ids = action.ids;
			let data = {...state};
			data[resultsType] = loadData(resultsType, ids);
			return {...state, ...data};
		default:
			return state;
	}
}

function details(state, action) {
	if (!state) {
		return {comics: [], creators: [], characters: [], series: []};
	}

	switch (action.type) {
		case LOAD_DETAILS:
			let resultsType = action.resultsType;
			let id = action.id;
			return {...state, ...loadDetails(resultsType, id)};
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


export default combineReducers({ data, sort, details });
