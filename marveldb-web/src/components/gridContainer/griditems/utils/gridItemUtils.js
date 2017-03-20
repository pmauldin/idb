function truncateDescription(s) {
	if (!s) {
		return 'No Description';
	}

	return s.slice(0, 140) + '...';
}

function getYearRange(startYear, endYear) {
	endYear =  endYear >= 2099 ? 'Present' : endYear;
	return startYear + ' - ' + endYear;
}

export default { truncateDescription, getYearRange };