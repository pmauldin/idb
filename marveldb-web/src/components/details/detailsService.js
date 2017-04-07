import dataService from '../../utils/dataService';

export default class detailsService {

	static loadDetails(type, id, relatedTypes, dataLoadedCallback)  {

		let requestOptions = {
			pagination: {
				page: 0,
				pageSize: 200
			},
			sortOptions: {
				field: "id",
				order: "asc"
			},
			filters: [
				{
					field: "id",
					operator: "=",
					value: String(id)
				}
			]
		};

		dataService.getData(type, requestOptions)
			.then(response => {
				let data = response.data;
				if (data.length > 0) {
					dataLoadedCallback(data, type);
					relatedTypes.forEach(relatedType => {
						requestOptions.filters = [
							{
								field: "id",
								operator: "in",
								value: `(${data[0][relatedType]})`
							}
						];

						dataService.getData(relatedType, requestOptions)
							.then(relatedResponse => {
								let relatedData = relatedResponse.data;
								dataLoadedCallback(relatedData, relatedType);
							})
							.catch(error => {
								console.error(error);
							});
					});
				}
			})
			.catch(error => {
				console.error(error);
			});
	}


}