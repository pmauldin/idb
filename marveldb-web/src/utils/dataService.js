import data from './data';

export default class DataService {

	static choose(collection, id) {
		if (id === undefined) {
			return collection;
		}

		return collection.find(item => item.id === id);
	}

	static getCharacters(id) {
		return DataService.choose(data.characters, id);
	}

	static getComics(id) {
		return DataService.choose(data.comics, id);
	}

	static getCreators(id) {
		return DataService.choose(data.creators, id);
	}

	static getSeries(id) {
		return DataService.choose(data.series, id);
	}
}
