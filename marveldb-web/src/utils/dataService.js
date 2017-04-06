import axios from 'axios'; 

const root = "http://developer.marveldbs.me/api";

function getData(path, requestOptions, ids, callback) {
	// TODO pass requestOptions to backend
	return new Promise((resolve, reject) => {
		axios.get(path)
			.then(response => {
				if (callback) {
					return resolve(callback(response.data, requestOptions, ids));
				}
				return resolve(response.data);
			})
			.catch(error => {
				console.error(error);
				reject(error);
			});
	});
}

function filterData(data, requestOptions, ids) {
	// TODO Remove
	if (!data || data.length === 0) {
		return;
	}

	if (ids) {
		data = data.filter(item => ids.includes(item.id));
	}

	if (requestOptions) {
		// Sort the data whenever sortData changes
		const field = requestOptions.sortOptions.field;
		const order = requestOptions.sortOptions.order === "asc" ? 1 : -1;
		data.sort((a, b) => order * (a[field] !== b[field] ? a[field] < b[field] ? -1 : 1 : 0));

		// Filter the data whenever the filter is updated
		// const value = requestOptions.filterOptions.value;
		// if (value && value.length > 0) {
		// 	data = data.filter((item) => item[this.state.filteringFields.name.field].toLowerCase().includes(value.toLowerCase()));
		// }
		console.log(requestOptions.filters)
	}

	return data;
}

export default class DataService {
	static getTestOutput() {
		return getData(root + '/tests');
	}

	static getCount(type) {
		return new Promise((resolve, reject) => {
			return resolve(600);
		});
		// return getData(root + '/' + type.toLowerCase() + '/count');
	}

	static getData(type, requestOptions, ids) {
		return getData(root + '/' + type.toLowerCase(), requestOptions, ids, filterData);
	}
}
