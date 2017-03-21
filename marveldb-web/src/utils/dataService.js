import axios from 'axios'; 

// const root = 'https://marveldb-162206.appspot.com';
const root = "http://localhost:8080/api";

function getData(path, ids, callback) {
	return new Promise((resolve, reject) => {
		axios.get(path)
			.then(response => {
					return resolve(callback(response.data, ids));
			})
			.catch(error => {
				console.log(error);
				reject(error);
			});
	});
}

function filterData(collection, ids) {
	if (ids === undefined) {
		return collection;
	}
	return collection.filter(item => ids.includes(item.id));
}

export default class DataService {
	static getCharacters(ids) {
		const path = root + '/characters';
		return getData(path, ids, filterData);
	}

	static getComics(ids) {
		const path = root + '/comics';
		return getData(path, ids, filterData);
	}

	static getCreators(ids) {
		const path = root + '/creators';
		return getData(path, ids, filterData);
	}

	static getSeries(ids) {
		const path = root + '/series';
		return getData(path, ids, filterData);
	}

	static getData(type, ids) {
		return getData(root + '/' + type.toLowerCase(), ids, filterData);
	}
}
