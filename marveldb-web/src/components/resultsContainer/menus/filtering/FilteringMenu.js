import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import debounce from 'lodash/debounce';
import '../styles/FilteringMenu.css';
import '../styles/Toolbar.css';

export default class FilteringMenu extends Component {
	constructor(props) {
		super(props);

		this.onFilterEntered = debounce(this.onFilterEntered, 500);
		this.debounceEvent = this.debounceEvent.bind(this);

		let filterElements = props.filters.map((filter) =>
			<div key={filter.displayString} className="filterOption">
				<ControlLabel>{filter.displayString + ':'}</ControlLabel>
				<FormControl id={filter.displayString} onChange={this.debounceEvent} min="0" type="number" />
			</div>);

		this.state = {
			activeFilters: [],
			filterElements
		};

	}

	onFilterEntered(filterElement) {
		let { id, value } = filterElement;

		let activeFilters = this.state.activeFilters;
		let filter = activeFilters.find(filter => filter.displayString === id);

		if (!filter) {
			filter = this.props.filters.find(filter => filter.displayString === id);
			if (!filter) {
				console.error(`No filter found with id = ${id}. `);
				return;
			}

			activeFilters.push(filter);
		}

		filter.value = Number(value);
		this.props.filtersUpdated(activeFilters);
		this.setState({activeFilters});
	}

	debounceEvent(event) {
		event.preventDefault();
		this.onFilterEntered(event.target);
	}

	render() {
		return (
			<FormGroup className="toolbarFormGroup" >
				{this.state.filterElements}
			</FormGroup>
		);
	}
};