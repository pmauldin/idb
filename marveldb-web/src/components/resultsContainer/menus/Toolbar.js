import React, { Component } from 'react';
import { Grid, Col, Row, Form } from 'react-bootstrap';
import SortingMenu from './sorting/SortingMenu';
import FilteringMenu from './filtering/FilteringMenu';
import PaginationMenu from './pagination/PaginationMenu';
import './styles/Toolbar.css';

export default class Toolbar extends Component {

	render() {
		return (
			<Form inline>
				<Grid className="toolbarGrid">
					<Row className="toolbarRow">
						<Col xs={6} sm={4} md={2} lg={2} className="filterButtonWrapper">
							<FilteringMenu {...this.props} />
						</Col>
						<Col xs={6} sm={8} md={4} lg={4} className="filterButtonWrapper">
							<PaginationMenu {...this.props} />
						</Col>
						<Col xs={12} sm={12} md={6} lg={6}>
							<SortingMenu {...this.props} />
						</Col>
					</Row>
				</Grid>
			</Form>
		);
	}
}
