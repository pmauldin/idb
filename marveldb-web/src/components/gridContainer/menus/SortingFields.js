function constructField (fieldName, displayName) {
	return {'fieldName': fieldName, 'displayName': displayName};
}

const ComicFields = [
	constructField('title', 'Title'),
	constructField('issueNumber', 'Issue Number'),
	constructField('pageCount', 'Page Count'),
	constructField('printPrice', 'Print Price'),
	constructField('digitalPrice', 'Digital Price'),
	constructField('dateReleased', 'Date Released')
];

const CharacterFields = [
	constructField('name', 'Name'),
	constructField('numComicAppearances', '# Comic Appearances'),
	constructField('numSeriesAppearances', '# Series Appearances'),
];

const SeriesFields = [
	constructField('title', 'Title'),
	constructField('startYear', 'Start Year'),
	constructField('endYear', 'End Year'),
	constructField('numComics', '# Comics in Series'),
	constructField('numCharacters', '# Characters in Series'),
	constructField('numCreators', '# Creators Involved in Series')
];

const CreatorFields = [
	constructField('fullName', 'Name'),
	constructField('numComics', '# Comics Contributed To'),
	constructField('numSeries', '# Series Contributed To'),
];

export default { 'ComicFields': ComicFields, 'CharacterFields': CharacterFields, 'CreatorFields': CreatorFields, 'SeriesFields': SeriesFields };

