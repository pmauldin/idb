import axios from 'axios'; 

const root = "http://developer.marveldbs.me/api";

function getData(path, requestOptions) {
	let params;
	if (requestOptions) {
		let filters;
		if (requestOptions.filters) {
			filters = requestOptions.filters.map(filter => { return {
				field: filter.field,
				val: filter.value,
				comparator: filter.operator
			}});

			filters = JSON.stringify(filters);
		} else {
			filters = "[]";
		}

		let searchOptions;
		if (!requestOptions.searchOptions) {
			searchOptions = "[]";
		}

		params = {
			pagination: JSON.stringify(requestOptions.pagination),
			sortOptions: JSON.stringify(requestOptions.sortOptions),
			filterOptions: filters,
			searchOptions: searchOptions
		};
	}

	return new Promise((resolve, reject) => {
		axios.get(path, {
				params
			})
			.then(response => {
				return resolve(response.data);
			})
			.catch(error => {
				console.error(error);
				reject(error);
			});
	});
}

export default class DataService {
	static getTestOutput() {
		return getData(root + '/tests');
	}

	static getCount(type) {
		return getData(root + '/' + type.toLowerCase() + '/count');
	}

	static getData(type, requestOptions, ids) {
		return getData(root + '/' + type.toLowerCase(), requestOptions, ids);
	}

	static getVisualizationData() {
		return getData('http://www.sweatshop.tech/api/company?q={"filters":[{"name":"funding","op":"is_not_null"}],"order_by":[{"field":"funding","direction":"desc"}],"limit":10}')
	}
}
