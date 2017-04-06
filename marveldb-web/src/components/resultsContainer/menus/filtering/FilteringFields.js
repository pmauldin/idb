function constructFilter (field, displayString, operator) {
	return {field, displayString, operator};
}

const ComicFilters = [
	constructFilter('issueNumber', 'Issue', '=')
];

const CharacterFilters = [
];

const SeriesFilters = [
];

const CreatorFilters = [
];

export default {  ComicFilters, CharacterFilters, CreatorFilters, SeriesFilters };
