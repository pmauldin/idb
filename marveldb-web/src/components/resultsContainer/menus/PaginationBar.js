import React, { Component } from 'react';
import { Grid, Col, Row, Form } from 'react-bootstrap';
import PaginationMenu from './pagination/PaginationMenu';
import './styles/Toolbar.css';

export default class PaginationBar extends Component {

	render() {
		return (
			<Form inline>
				<Grid className="toolbarGrid">
					<Row className="toolbarRow">
						<Col xs={8} xsOffset={4} sm={8} smOffset={4} md={8} mdOffset={4} lg={8} lgOffset={4}>
							<PaginationMenu {...this.props} />
						</Col>
					</Row>
				</Grid>
			</Form>
		);
	}
}
