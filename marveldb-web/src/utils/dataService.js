import axios from 'axios'; 

const root = "http://developer.marveldbs.me/api";

function getData(path, ids, callback) {
	return new Promise((resolve, reject) => {
		axios.get(path)
			.then(response => {
					return resolve(callback(response.data, ids));
			})
			.catch(error => {
				console.error(error);
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
	static getData(type, ids) {
		return getData(root + '/' + type.toLowerCase(), ids, filterData);
	}
}
