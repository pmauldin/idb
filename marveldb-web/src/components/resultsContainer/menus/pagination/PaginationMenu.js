import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import '../styles/PaginationMenu.css';


export default class PaginationMenu extends Component {
	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(eventKey) {
		this.props.paginationUpdated({...this.props.pagination, page: Math.max(1, eventKey)});
	}

	render() {
		let items = (this.props.searchActive) ? Math.floor((this.props.count / this.props.pagination.pageSize)*.7) : 
												Math.floor(this.props.count / this.props.pagination.pageSize);
		return (
			<Pagination className="paginationMenu" prev next first last ellipsis boundaryLinks
						maxButtons={3} onSelect={this.handleSelect} activePage={this.props.pagination.page} items={items} />
		); // TODO: Figure out why all pages aren't accessible (hence the .7)
	}
};