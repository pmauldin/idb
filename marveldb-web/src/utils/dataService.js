import data from './data';

export default class DataService {

	static choose(collection, ids) {
		if (ids === undefined) {
			return collection;
		}

		return collection.filter(item => ids.includes(item.id));
	}

	static getCharacters(ids) {
		return DataService.choose(data.characters, ids);
	}

	static getComics(ids) {
		return DataService.choose(data.comics, ids);
	}

	static getCreators(ids) {
		return DataService.choose(data.creators, ids);
	}

	static getSeries(ids) {
		return DataService.choose(data.series, ids);
	}
}
