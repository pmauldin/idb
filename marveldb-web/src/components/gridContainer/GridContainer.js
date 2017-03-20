import React, { Component } from 'react';
import ComicGridItem from './griditems/Comic';
import CreatorGridItem from './griditems/Creator';
import CharacterGridItem from './griditems/Character';
import SeriesGridItem from './griditems/Series';
import SortingMenu from './menus/SortingMenu';

export default class GridContainer extends Component {

	constructor(props) {
		super(props);

		switch (props.type) {
			case "comic":
				this.GridItem = ComicGridItem;
				break;
			case "creator":
				this.GridItem = CreatorGridItem;
				break;
			case "character":
				this.GridItem = CharacterGridItem;
				break;
			case "series":
				this.GridItem = SeriesGridItem;
				break;
			default:
				console.error(`Given type ${props.type} is invalid.`);
				break;
		}
	}

	render() {
		const GridItem = this.GridItem;

		return (
			<div>
				<SortingMenu />
				<GridItem />
			</div>
		);
	}
}
