import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../styles/FilteringMenu.css';
import '../styles/Toolbar.css';

export default class FilteringMenu extends Component {

	render() {
		return (
			<FormGroup className="toolbarFormGroup" controlId="sortMenuSelect">
				<ControlLabel>{this.props.filteringFields.name.display}:&nbsp;</ControlLabel>
				<FormControl
					type="text"
					onChange={(event) => this.props.filterByName(event.target.value)}
					className="filterNameTextbox"
				/>
			</FormGroup>
		);
	}
};