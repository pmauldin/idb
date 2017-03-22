import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../styles/SortingMenu.css';
import '../styles/Toolbar.css';

export default class SortingMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldOptions: props.sortingFields.map((option) =>
				<option key={option.fieldName} value={option.fieldName}>{option.displayName}</option>)
		};
	}

	render() {
		return (
			<FormGroup className="toolbarFormGroup" controlId="sortMenuForm">
				<ControlLabel>Sort By:</ControlLabel>
				<FormControl onChange={(event) => this.props.toggleSortField(event.target.value)} className="sortMenuDropdown" componentClass="select" placeholder={this.state.fieldOptions[0].fieldName}>
					{this.state.fieldOptions}
				</FormControl>
				<ControlLabel>&nbsp;Order:</ControlLabel>
				<FormControl onChange={(event) => this.props.toggleSortOrder(event.target.value)} className="sortMenuDropdown" componentClass="select" placeholder="ascending">
					<option value="ascending">Ascending</option>
					<option value="descending">Descending</option>
				</FormControl>
			</FormGroup>
		);
	}
};