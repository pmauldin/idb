import dataService from '../../utils/dataService';

export default class detailsService {

	static loadDetails(type, id, relatedTypes, dataLoadedCallback)  {
		dataService.getData(type, [id])
			.then(data => {
				if (data.length > 0) {
					dataLoadedCallback(data, type);
					relatedTypes.forEach(relatedType => {
						dataService.getData(relatedType, data[0][relatedType])
							.then(relatedData => {
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