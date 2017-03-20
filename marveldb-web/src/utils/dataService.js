import data from './data';

export default class DataService {

	static choose(collection, id) {
		if (id === undefined) {
			return collection;
		}

		return collection.find(item => item.id === id);
	}

	static getCharacters(id) {
		return this.choose(data.characters, id);
	}

	static getComics(id) {
		return this.choose(data.comics, id);
	}

	static getCreators(id) {
		return this.choose(data.creators, id);
	}

	static getSeries(id) {
		return this.choose(data.series, id);
	}
}
