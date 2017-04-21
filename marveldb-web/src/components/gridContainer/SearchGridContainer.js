import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import './styles/GridContainer.css';
import ComicGridItem from '../gridContainer/griditems/ComicGridItem';
import CreatorGridItem from '../gridContainer/griditems/CreatorGridItem';
import CharacterGridItem from '../gridContainer/griditems/CharacterGridItem';
import SeriesGridItem from '../gridContainer/griditems/SeriesGridItem';
// import flatten from 'lodash/flatten';

export default class SearchGridContainer extends Component {
	getGridItem(resultType) {
		switch (resultType) {
			case "comics":
			case "comic":
				return ComicGridItem;
			case "creators":
			case "creator":
				return CreatorGridItem;
			case "characters":
			case "character":
				return CharacterGridItem;
			case "series":
				return SeriesGridItem;
			default: 
				console.error('Unrecognized result type ' + resultType);
		}
	}

	render() {
		var data = this.props.data;
		var resultsTypes = Object.keys(data);
		let dataPresent = data && resultsTypes.every(item => data[item]) && resultsTypes.find(item => data[item].count > 0);

		if (!dataPresent) {
			return (
				<div>
					No Results Found
				</div>
			)
		} else {
			const allResults = [];
			resultsTypes.forEach(resultType => {
				data[resultType].data.forEach(searchResult => {
					searchResult.type = resultType.split('Result')[0]
					allResults.push(searchResult);
				})
			});

			const gridItems = allResults.map(item => {
				const GridItem = this.getGridItem(item.type);
				return (
					<Col key={item.id} xs={12} sm={4} md={4} lg={4}>
						<GridItem inGrid={true} {...item} />
					</Col>
				);
			});

			return (
				<Grid className="marginlessGrid">
					<Row>
						{gridItems}
					</Row>
				</Grid>
			);
		}
	}
}
