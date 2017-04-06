function constructFilter (field, displayString, operator) {
	return {field, displayString, operator};
}

const ComicFilters = [
	constructFilter('issueNumber', 'Issue', '='),
	constructFilter('pageCount', 'Min Page Count', '>='),
	constructFilter('pageCount', 'Max Page Count', '<='),
	constructFilter('printPrice', 'Min Print Price', '>='),
	constructFilter('printPrice', 'Max Print Price', '<='),
	constructFilter('digitalPrice', 'Min Digital Price', '>='),
	constructFilter('digitalPrice', 'Max Digital Price', '<=')
];

const CharacterFilters = [
	constructFilter('numComics', 'Min Comic Appearances', '>='),
	constructFilter('numComics', 'Max Comic Appearances', '<='),
	constructFilter('numSeries', 'Min Series Appearances', '>='),
	constructFilter('numSeries', 'Max Series Appearances', '<=')
];

const SeriesFilters = [
	constructFilter('startYear', 'Min Start Year', '>='),
	constructFilter('startYear', 'Max Start Year', '<='),
	constructFilter('endYear', 'Min End Year', '>='),
	constructFilter('endYear', 'Max End Year', '<='),
	constructFilter('numComics', 'Min # Of Comics', '>='),
	constructFilter('numComics', 'Max # Of Comics', '<='),
	constructFilter('numCharacters', 'Min # Of Characters', '>='),
	constructFilter('numCharacters', 'Max # Of Characters', '<='),
	constructFilter('numCreators', 'Min # Of Creators', '>='),
	constructFilter('numCreators', 'Max # Of Creators', '<=')
];

const CreatorFilters = [
	constructFilter('numComics', 'Min Comics Created', '>='),
	constructFilter('numComics', 'Max Comics Created', '<='),
	constructFilter('numSeries', 'Min Series Created', '>='),
	constructFilter('numSeries', 'Max Series Created', '<=')
];

export default {  ComicFilters, CharacterFilters, CreatorFilters, SeriesFilters };
