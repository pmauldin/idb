import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import '../styles/PaginationMenu.css';


export default class PaginationMenu extends Component {
	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(eventKey) {
		this.props.paginationUpdated({...this.props.pagination, page: eventKey});
	}

	render() {
		return (
			<Pagination className="paginationMenu" prev next first last ellipsis boundaryLinks
						maxButtons={3} onSelect={this.handleSelect} activePage={this.props.pagination.page}
						items={this.props.count / this.props.pagination.pageSize} />
		);
	}
};