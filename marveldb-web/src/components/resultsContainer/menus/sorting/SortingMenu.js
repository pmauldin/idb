import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../styles/SortingMenu.css';
import '../styles/Toolbar.css';

export default class SortingMenu extends Component {
	constructor(props) {
		super(props);

		let fieldOptions = props.sortingFields.map((option) =>
			<option key={option.fieldName} value={option.fieldName}>{option.displayName}</option>);

		let sortingOptions = {
			field: props.sortingFields[0].fieldName,
			order: 'asc'
		};

		this.state = {
			fieldOptions,
			sortingOptions
		};

		this.onSortFieldChange = this.onSortFieldChange.bind(this);
		this.onSortOrderChange = this.onSortOrderChange.bind(this);
	}

	onSortFieldChange(event) {
		let sortingOptions = {...this.state.sortingOptions, field: event.target.value};
		this.props.sortOptionsUpdated(sortingOptions);
		this.setState({sortingOptions});
	}

	onSortOrderChange(event) {
		let sortingOptions = {...this.state.sortingOptions, order: event.target.value};
		this.props.sortOptionsUpdated(sortingOptions);
		this.setState({sortingOptions});
	}


	render() {
		return (
			<FormGroup className="toolbarFormGroup" controlId="sortMenuForm">
				<ControlLabel>Sort By:</ControlLabel>
				<FormControl onChange={this.onSortFieldChange} className="sortMenuDropdown" componentClass="select" placeholder={this.state.fieldOptions[0].fieldName}>
					{this.state.fieldOptions}
				</FormControl>
				<ControlLabel>&nbsp;Order:</ControlLabel>
				<FormControl onChange={this.onSortOrderChange} className="sortMenuDropdown" componentClass="select" placeholder="asc">
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</FormControl>
			</FormGroup>
		);
	}
};