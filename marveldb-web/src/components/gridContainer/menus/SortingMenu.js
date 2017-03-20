import React, { Component } from 'react';
import { Nav, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './styles/SortingMenu.css';

export default class SortingMenu extends Component {
	// constructor(props) {
	// 	super(props);

	// 	// Take in enum of sortable fields
	// }

	render() {
		return (
			<div className="sortingMenuContainer">
				<Nav className="sortingMenuNav">
					<Form inline>
						<FormGroup className="sortMenuFormGroup" controlId="sortMenuSelect">
							<ControlLabel>Sort By:</ControlLabel>
							<FormControl className="sortMenuDropdown" componentClass="select" placeholder="title">
								<option value="title">Title</option>
								<option value="issueNumber">Issue Number</option>
								<option value="pageCount">Page Count</option>
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