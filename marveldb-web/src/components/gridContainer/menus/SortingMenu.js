import React, { Component } from 'react';
import { Nav, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './styles/SortingMenu.css';

export default class SortingMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldOptions: props.sortingFields.map((option) => <option
				value={option.fieldName}>{option.displayName}</option>)
		};
	}

	render() {
		return (
			<div className="sortingMenuContainer">
				<Nav className="sortingMenuNav">
					<Form inline>
						<FormGroup className="sortMenuFormGroup" controlId="sortMenuSelect">
							<ControlLabel>Sort By:</ControlLabel>
							<FormControl className="sortMenuDropdown" componentClass="select" placeholder={this.state.fieldOptions[0].fieldName}>
								{this.state.fieldOptions}
							</FormControl>
							<ControlLabel>Order:</ControlLabel>
							<FormControl className="sortMenuDropdown" componentClass="select" placeholder="ascending">
								<option value="ascending">Ascending</option>
								<option value="descending">Descending</option>
							</FormControl>
						</FormGroup>
					</Form>
				</Nav>
			</div>
		);
	}
};