import React, { Component } from 'react';
import ComicGridItem from './griditems/Comic';
import CreatorGridItem from './griditems/Creator';
import CharacterGridItem from './griditems/Character';
import SeriesGridItem from './griditems/Series';
import SortingMenu from './menus/SortingMenu';
import fields from './menus/SortingFields';

export default class GridContainer extends Component {
	constructor(props) {
		super(props);
		switch (this.props.gridType) {
			case "comic":
				this.state = {'GridItem': ComicGridItem, 'SortingFields': fields.ComicFields};
				break;
			case "creator":
				this.state = {'GridItem': CreatorGridItem, 'SortingFields': fields.CreatorFields};
				break;
			case "character":
				this.state = {'GridItem': CharacterGridItem, 'SortingFields': fields.CharacterFields};
				break;
			case "series":
				this.state = {'GridItem': SeriesGridItem, 'SortingFields': fields.SeriesFields};
				break;
			default:
				console.error(`Given type ${this.props.gridType} is invalid.`);
				break;
		}
	}

	render() {
		const GridItem = this.state.GridItem;
		console.log('In GridContainer, SortingFields = ', this.state.SortingFields);
		console.log('In GridContainer, GridItem = ', this.state.GridItem);
		return (
			<div>
				<SortingMenu sortingFields={this.state.SortingFields} />
				<GridItem />
			</div>
		);
	}
}
